const go = new Go();
var wasm;

WebAssembly.instantiateStreaming(
    fetch('main.wasm'),
    go.importObject
).then(result => {
    wasm = result.instance;
    go.run(result.instance);
})
