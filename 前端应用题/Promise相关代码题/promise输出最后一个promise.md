# promise输出最后一个promise

```javascript
let count = 1;
const executeFunction = () => {
  return new Promise((res) => {
    setTimeout(() => {
      res(count++);
    });
  });
};

function promise (promise) {}

const lastFun = promise(promiseFunction);

// lastFun().then(()=>console.log)
// lastFun().then(()=>console.log)
// lastFun().then(()=>console.log)

// 要求以上代码之后后输出
// undefined
// undefined
// 3
// 请实现promise


let count = 1;
const executeFunction = () => {
  return new Promise((res) => {
    setTimeout(() => {
      res(count++);
    });
  });
};

function myDebouncePromise (promiseFunction) {
  let count=0;

  return async function(...args){
    count++;
    const current = count;
    const re = await promiseFunction(args);
    if(current === count){
      return re;
    }
    return null
  }
}
const lastFun2 = myDebouncePromise(executeFunction);

lastFun2().then((r) => console.log(r));
lastFun2().then((r) => console.log(r));
lastFun2().then((r) => console.log(r));
```

