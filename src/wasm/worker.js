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

self.importScripts('shared.js');

let api;
let port;

const apiOptions = {
  compileStreaming: true,
  wasmBasePath: '', 
  async readBuffer(filename) {
    const response = await wasmCache.get(filename);
    return response.arrayBuffer();
  },

  async compileStreaming(filename) {
    if (WebAssembly.compileStreaming) {
      return WebAssembly.compileStreaming(await wasmCache.get(filename));
    } else {
      const response = await wasmCache.get(filename);
      return WebAssembly.compile(await response.arrayBuffer());
    }
  },

  hostWrite(s) { port.postMessage({id : 'write', data : s}); }
};

let currentApp = null;

const onAnyMessage = async event => {
  switch (event.data.id) {
  case 'constructor':
    port = event.data.data;
    port.onmessage = onAnyMessage;
    api = new API(apiOptions);
    await api.prepareEnvironment();
    break;

  case 'setShowTiming':
    api.showTiming = event.data.data;
    break;

  case 'compileLinkRun':
    if (currentApp) {
      console.log('First, disallowing rAF from previous app.');
      // Stop running rAF on the previous app, if any.
      currentApp.allowRequestAnimationFrame = false;
    }
    currentApp = await api.compileLinkRun(event.data.data);
    console.log(`finished compileLinkRun. currentApp = ${currentApp}.`);
    break;
  }
};

self.onmessage = onAnyMessage;
