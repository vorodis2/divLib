1. переходим на ссылку
https://mbebenita.github.io/WasmExplorer/
2. Фигачиваем также как на pic1
3. Смотрим script.js



loadWebAssembly('square.wasm')//хрень которую скачали
  .then(instance => {//загрузка с таймом
    var square = instance.exports._Z7squareri;//_Z7squareri-вотета функция из с++   
  }) 
