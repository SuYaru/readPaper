let Person = {};
Object.defineProperty(Person, "name", {
  name: "jack",
  // writable:true
});

Person.name = "aaaaa";

console.log(Person.name);

// ===========================2
let Person = {};
let temp = null;
Object.defineProperty(Person, "name", {
  get: function () {
    return temp;
  },
  set: function (val) {
    temp = val;
  },
});

Person.name = "aaaaa";

console.log(Person.name);

Function.prototype.call = Function.prototype.call || function (context,...args) {
    context= (context!=null || context!=undefined)?Object(context) : window;
    //将当前方法绑定到this
    context.fn=this; 
    //执行
    const result = context.fn(...args);
    //删除属性
    delete context.fn;
    //返回结果
    return result;
};



Function.prototype.bind = Function.prototype.bind || function (context,...args) {
    context= (context!=null || context!=undefined)?Object(context) : window;
    const self=this;
    return function(...args2){
        return self.call(context,...args,...args2);
    }
}


//定义日志的装饰器
function log(target,name,descriptor){
    const orgin=descriptor.value;
    descriptor.value=function(...args){
        console.log('start：我开始执行方法了');
        orgin.apply(this,args);
        console.log('end：我已经执行完成了')
    }
    return descriptor;
}

function test(){
    console.log('aaaaaaaaa')
}



var a={};
var map=new WeakMap();
map.set(a,'前端');
console.log(map.get(a));
