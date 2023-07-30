// =============================================
// 实现 add(1)(2)(3)
//
// add(1)(2)(3) => 6
// =============================================

// =============================================
// 思路
//
// 1.返回的肯定是一个函数
// 2.前面主要是收集函数
// 3.找到终止条件，如果没有终止条件改变toString方法
// =============================================

/**
 * add
 * @param  {...any} params
 * @returns
 */
const add = (...params) => {
  let resArr = params;
  // 收集参数
  _add = function (...rest) {
    resArr = resArr.concat(rest);
    return _add;
  };
  // 修改toString
  _add.toString = function () {
    return resArr.reduce((a, b) => a + b);
  };
  return _add;
};
add(1)(2)(3);

// =============================================
// 实现 var fn=add(1)(2)(3); fn.getValue(); // 6
//
// =============================================
function add(...args){
  //定义一个参数收集器
  let paramsArr=args;
  //定义一个方法
  const fn=function(...fnArgs){
    paramsArr=paramsArr.concat(fnArgs);
    return fn;
  }
  //定义方法上的一个属性
  fn.getValue=()=>{
    return paramsArr.reduce((pre,curr)=>pre+curr,0)
  };
  //返回这个方法
  return fn;
}
var fn=add(1)(2)(3); 
console.log(fn.getValue()); 