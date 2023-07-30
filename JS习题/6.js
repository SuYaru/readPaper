function deepClone(obj, map = new WeakMap()) {
  //拿hash
  if (map.has(obj)) {
    return map.get(obj);
  }

  //判断object
  if (typeof obj == "object" && obj != null) {
    const cacheObj = Array.isArray(obj) ? [] : {};

    //set hash
    map.set(obj, cacheObj);

    //symbol属性
    let symbols = Object.getOwnPropertySymbols(obj);
    if (symbols.length > 0) {
      for (let item of symbols) {
          cacheObj[item] = deepClone(obj[item], map);
      }
    }

    //递归
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        cacheObj[key] = deepClone(obj[key], map);
      }
    }

    //返回
    return cacheObj;
  } else {
    return obj;
  }
}

let sya = Symbol("aaa");

var obj = {
  [sya]: "sya1",
  a: "123",
  obj2: obj,
  b: null,
  c: function () {},
  arr: [1, 2, 3, 4, , , , 7],
  d: {
    e: 123,
    f: undefined,
    g: obj,
    [sya]: "sya2",
  },
};

obj.obj2 = obj;

console.log(deepClone(obj));
