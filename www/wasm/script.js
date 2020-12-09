
let wasm = {};

function loadWebAssembly(fileName) {
  return fetch(fileName)
    .then(response => response.arrayBuffer())
    .then(buffer => WebAssembly.compile(buffer))
    .then(module => {return new WebAssembly.Instance(module) });
};
  
loadWebAssembly('fib.wasm')
  .then(instance => {
    wasm.fib = instance.exports._Z3Fibi;
  }) 

function fib(n) {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

function check(fun, n, label) {
  console.time(label);
  let res = fun(n)
  console.timeEnd(label);
  return res;
}

