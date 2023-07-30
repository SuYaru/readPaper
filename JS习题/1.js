// =============================================
// 实现 lodash 中的 get 函数
//
// get({ a: [{ b: { c: 3 } }] }, 'a[0].b.c') => 3
// =============================================

// =============================================
// 思路
//
// 1.先将path转换成可以对属性分割的格式
// 2.循环获取每个属性的值
// 3.注意：如果不存在直接返回默认值，利用Object(a).b保障a.b不报错
// =============================================

/**
 * lodash.get
 * @param {object} obj
 * @param {string} path
 * @param {any} defaultVal
 * @returns
 */
const get = (obj, path, defaultVal = undefined) => {
  const newPath = path.replace(/\[(.+)\]/g, ".$1").split(".");
  const len = newPath.length;
  let result = obj;
  for (let i = 0; i < len; i++) {
    result = Object(result)[newPath[i]];
    if (result === undefined) return defaultVal;
  }
  return result;
};
const obj = { a: [{ b: { c: 3 } }] };
console.log(get(obj, "a[0].b.c"));
