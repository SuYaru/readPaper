// =============================================
// 简单实现 async
//
// const getData = (text) =>
//   new Promise((resolve) => setTimeout(() => resolve(text), 1000));
// async function test() {
//   const data = await getData("data1");
//   console.log("data: ", data);
//   const data2 = await getData("data2");
//   console.log("data2: ", data2);
//   return "success";
// }
// 这样的一个函数 应该再1秒后打印data 再过一秒打印data2 最后打印success
// test().then((res) => console.log(res));
// =============================================

// =============================================
// 思路
//
// 1.async是generator语法糖
// 2.返回的是一个函数
// 3.模拟手动去调用这个generator函数
// =============================================
function asyncToGenerator(generatorFunc) {
  // 返回的是一个新的函数
  return function () {
    // 先调用generator函数 生成迭代器
    const gen = generatorFunc.apply(this, arguments);
    // 返回一个promise 因为外部是用.then的方式 或者await的方式去使用这个函数的返回值的
    return new Promise((resolve, reject) => {
      // 内部定义一个step函数 用来一步一步的跨过yield的阻碍
      // key有next和throw两种取值，分别对应了gen的next和throw方法
      // arg参数则是用来把promise resolve出来的值交给下一个yield
      function step(key, arg) {
        let generatorResult;
        // 如果报错了 就把promise给reject掉 外部通过.catch可以获取到错误
        try {
          generatorResult = gen[key](arg);
        } catch (error) {
          return reject(error);
        }
        // gen.next() 得到的结果是一个 { value, done } 的结构
        const { value, done } = generatorResult;
        if (done) {
          return resolve(value);
        } else {
          return Promise.resolve(value).then(
            (val) => step("next", val),
            (err) => step("throw", err)
          );
        }
      }
      step("next");
    });
  };
}
