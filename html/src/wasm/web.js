/*
 * Copyright 2020 WebAssembly Community Group participants
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

let term;
let api;

window.addEventListener('load', () => {
  function getFullSourceCode(editor) {
    if(!editor.mainFoldLines) {
      return editor.getValue();
    }

    let fold = editor.mainFoldLines;
    let allLines = editor.originalCode.replace(/\s+$/, '').split('\n');
    return [
      ...allLines.slice(0, fold.startRow),
      ...editor.getValue().split('\n').slice(1).map(line => " ".repeat(fold.indent) + line),
      ...allLines.slice(fold.endRow)
    ].join("\n");
  }

  function foldMain(editor) {
    const session = editor.session;

    function searchRow(regexp, reverse) {
      const code = editor.getValue();
      let m = regexp.exec(code);
      if(!m) {
        return -1;
      }

      let searchOffset = m.index;
      if(reverse === undefined || reverse === false) {
        searchOffset += m[0].length;
      }

      let line = 0;
      for(let offset = 0; offset < code.length; offset++) {
        if(code[offset] == '\n') {
          line++;
        }

        let coef = (reverse === undefined || reverse === 0) ? 1 : -1;
        if(offset >= searchOffset) {
          return line;
        }
      }
      return -1;
    }

    let mainRow = searchRow(/int main\([^)]*\)\s*{\s*/);
    let endRow = searchRow(/\s*return 0;\n}\s*$/s, true);
    if(mainRow >= 0 && endRow >= 0) {
      const allLines = editor.getValue().split('\n');
      let lines = allLines.slice(mainRow, endRow);
      let indent = 0;
      for(let i = 0; i < lines[0].length; i++) {
        if(lines[0][i] != ' ' && lines[0] != '\t') {
          break;
        }
        indent++;
      }

      editor.mainFoldLines = {
        startRow: mainRow,
        endRow: endRow,
        indent: indent,
      };

      editor.setValue("//\n" + lines.map(line => line.substr(indent)).join('\n'), 1);
      let fakeFold = session.addFold("main", new ace.Range(0, 0, 0, Infinity));
      session.on('changeFold', evt => {
        if(evt.action == 'remove' && evt.data == fakeFold) {
          editor.setValue(getFullSourceCode(editor), 1);
          editor.mainFoldLines = undefined;
        }
      });
    }
  }

  document.querySelectorAll('pre .buttons').forEach(el => {
    let container = el.closest('pre');
    let editorEl = container.querySelector('.ace_editor');
    if(!editorEl) {
      return;
    }
    let editor = editorEl.env.editor;
    let localTerm;

    editor.getSession().setMode("ace/mode/c_cpp");
    editor.setValue(editor.getValue().replace(/\s+$/, ''), 1);

    if(container.querySelector('code').classList.contains("mainbody")) {
      foldMain(editor);
    }
    if(container.querySelector('code').classList.contains("readonly")) {
      editor.setOptions({
        readOnly: true,
      });
      editor.renderer.$cursorLayer.element.style.display = "none"
    }

    const run = debounceLazy(async () => {
      initOrMoveTerm();
      localTerm.write("\r\n\x1bc");
      await api.compileLinkRun(new TextEncoder().encode(getFullSourceCode(editor)));
    }, 100);

    editor.commands.addCommand({
      "name": "save",
      "bindKey": "Ctrl-Enter",
      "exec": run,
    });


    const initOrMoveTerm = () => {
      if(!localTerm) {
        termEl = document.createElement('div');
        container.appendChild(termEl);
        localTerm = new Terminal({
          convertEol: true,
          disableStdin: true,
          fontSize: 18
        });
        localTerm.open(termEl);
        localTerm.fit();
        term = localTerm;
      }
      term = localTerm;

      if(!api) {
        api = new WorkerAPI();
      }
    };

    let btn = document.createElement('button')
    btn.classList.add('fa');
    btn.classList.add('fa-play');
    btn.onclick = () => run();
    el.insertBefore(btn, el.firstChild);
  });
});

Terminal.applyAddon(fit);

class WorkerAPI {
  constructor() {
    this.nextResponseId = 0;
    this.responseCBs = new Map();
    this.worker = new Worker((path_to_root || '/') + 'wasm/worker.js');
    const channel = new MessageChannel();
    this.port = channel.port1;
    this.port.onmessage = this.onmessage.bind(this);

    const remotePort = channel.port2;
    this.worker.postMessage({id: 'constructor', data: remotePort},
                            [remotePort]);
  }

  terminate() {
    this.worker.terminate();
  }

  async runAsync(id, options) {
    const responseId = this.nextResponseId++;
    const responsePromise = new Promise((resolve, reject) => {
      this.responseCBs.set(responseId, {resolve, reject});
    });
    this.port.postMessage({id, responseId, data : options});
    return await responsePromise;
  }

  async compileLinkRun(contents) {
    this.port.postMessage({id: 'compileLinkRun', data: contents});
  }

  onmessage(event) {
    switch (event.data.id) {
      case 'write':
        if(event.data.data instanceof Uint8Array) {
          term.writeUtf8(event.data.data);
        } else {
          term.writeUtf8(new TextEncoder().encode(event.data.data));
        }
        break;

      case 'runAsync': {
        const responseId = event.data.responseId;
        const promise = this.responseCBs.get(responseId);
        if (promise) {
          this.responseCBs.delete(responseId);
          promise.resolve(event.data.data);
        }
        break;
      }
    }
  }
}
