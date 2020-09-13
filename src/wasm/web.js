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
  function foldMain(session) {
    function searchRow(needle, args) {
      const Search = ace.require('ace/search').Search;
      let s = new Search();
      s.set({needle: needle, ...args});
      let result = s.find(session);
      return result ? result.start.row : -1;
    }

    let mainRow = searchRow("int main");
    let folding = null;
    if(mainRow >= 0) {
      let beginFold = session.addFold("main", new ace.Range(0, 0, mainRow, Infinity));
      let endBlock = searchRow("return 0;\n}", {backwards: true});
      if(endBlock >= 0) {
        let endFold = session.addFold("", new ace.Range(endBlock, 0, Infinity, Infinity));
        session.on('changeFold', function(evt) {
          if(evt.action == 'remove' && evt.data == beginFold) {
            session.unfold(endFold);
          }
        });
      }
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

    if(container.querySelector('code').classList.contains("mainbody")) {
      foldMain(editor.session);
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
      await api.compileLinkRun(new TextEncoder().encode(editor.getValue()));
    }, 100);

    editor.commands.addCommand({
      "name": "save",
      "bindKey": "Ctrl-Enter",
      "exec": run,
    });
    editor.getSession().setMode("ace/mode/c_cpp");


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
