# 手写js原生接口

# 手动实现一个call

```javascript
Function.prototype.myCall = function(target,arg){
  let innerArguments [];
  for(let i = 1;i<arguments.length;i++){
    innerArguments.push("arguments["+ i +"]");
  }
  // 将当前正在执行的函数复制给target;
  target.fn = this;
  // eval自动执行toString方法，以下相当于
  // 数组的toString ==> 用逗号将数组内容连接
  // target.fn(target,arguments[1],arguments[2],...arguments[n]);
  eval("target.fn("+innerArguments+")")
  // 从当前目标删除执行函数
  delete target.fn;
}
```

# 实现apply

```javascript
Function.prototype.myApply = function(target,arg){
  //将当前正在执行的函数复制给target;
  if(!arg){
    target.fn();
  }else{
    let args = [];
    for(let i = 0;i<arg.length;i++){
    	args.push("arg["+ i +"]");
  	}
   	//数组的toString ==> 用逗号将数组内容连接
   	//eval自动执行toString方法，以下相当于
    //target.fn(target,arguments[1],arguments[2],...arguments[n]);
   	eval("target.fn("+args+")")
   	//从当前目标删除执行函数
   	delete target.fn;
  }
}
```

# 函数柯里化

```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return function(...moreArgs) {
        return curried(...args, ...moreArgs);
      };
    }
  };
}
```

# 实现bind

```javascript
const module = {
  x: 42,
  getX: function () {
    return this.x;
  },
};

const unboundGetX = module.getX;
const boundGetX = unboundGetX.bind(module);

Function.prototype.myBind=function (ctx,...args){
  var _this = this;
  var arg = Array.from(arguments).slice(1);
  
  let newThis = ctx;
  
  var finF= function(){
    var actualArgs = arg.concat(Array.from(arguments));
    return _this.apply(newThis,actualArgs);
  }
  // 只改了原型链，没有增加new操作符的特性
  finF.prototype = Object.create(_this.prototype);
  return finF
}

const mboundGetX = unboundGetX.myBind(module);

Function.prototype.myBind2 = function(ctx, ...args) {
    const _this = this;
    const boundFn = function(...boundArgs) {
    const actualArgs = args.concat(boundArgs);
    if (this instanceof boundFn) {
// 作为构造函数调用，返回一个新对象，并继承被绑定函数的原型
        const instance = Object.create(_this.prototype);
        const result = _this.apply(instance, actualArgs);
        return Object(result) === result ? result : instance;
    } else {
// 作为普通函数调用，直接绑定上下文并传递参数
            return _this.apply(ctx, actualArgs);
        }
    };
// 保留绑定函数的原型属性
    boundFn.prototype = Object.create(_this.prototype);
    return boundFn;
};

const mboundGetX2 = unboundGetX.myBind2(module);

var test1 = new module.getX();
const kk = new mboundGetX()
const kk2 = new mboundGetX2()

console.log(test1 instanceof unboundGetX)
console.log(kk instanceof unboundGetX)
console.log(kk2 instanceof unboundGetX)
```

# 手写new

理解new: new是相当于实现一个实例，实例的原型proto都是指向构造函数的“原型对象(prototype)”

```javascript
var myNew = function(){
    let arg = [...arguments];
    let fn = arg[0];
    let constructorArgs = arg.slice(1);
    let o = {};
    o.__proto__ = fn.prototype; // 将需要创建的对象的原型指向构造函数的原型对象。
    fn.apply(o,constructorArgs); // 改变this指向
    return o;
}
```

```javascript
var protNew = function(){
    let o = Object.create(arguments[0].prototype); // 利用create实现原型对象的改变
    arguments[0].apply(o,null);
    return o;
}
```

# 链式调用

```javascript
function Dog(){
    this.run= function(){
        console.log("The dog is running....");
        return this;//返回当前对象 Dog
    };
    this.eat= function(){
        console.log("After running the dog is eatting....");
        return this;//返回当前对象 Dog
    };
    this.sleep= function(){
        console.log("After eatting the dog is running....");
        return this;//返回当前对象 Dog
      };
}

var c = new Dog()
c.run().eat().sleep().run()
```

#### 手动实现Object.freeze . (掌握Object.definePrototy已经四种属性特性)

#### js事件机制

简单来说，js事件机制就是由**执行栈**和**消息队列**构成，每调用一个函数，执行栈中会被推入一个函数及其参数和局部变量，执行结束便被推出执行栈。

函数在消息队列中的消息被处理到时，调用该消息对应的函数。即：消息队列中的每个消息对应一个函数，在事件循环的某个时间点，消息队列中的第一个消息会被处理，与之关联的函数（事件）会被推入执行栈以执行。当执行栈中的事件都执行结束后，会将消息队列中的第一个消息关联的事件推入执行栈。

#### 闭包

#### 闭包的概念：

​	在一个函数中可以访问另外一个函数作用域中的变量的函数被称作为闭包

```other
function outer(){
  let a = "outera";
  function inner(){
    console.log(a);
  }
}
outer();
```

在此例子中，函数`inner`可以访问外部函数`outer`中的变量a,则`inner`就是一个闭包。在outer被调用的时候，outer被推入执行栈，outer调用inner,inner被推入执行栈。inner访问outer的变量a,执行结束后回到outer，outer结束，释放outer所占用内存。

#### 作用域链

​	（顾名思义，作用域链是一个类似链表的数据结构）

​	保证对**执行环境**有权访问的**所有变量和函数**的**有序访问**（执行环境即执行上下文，每个函数都有自己的执行环境->即事件循环机制中的执行栈

​	每个执行环境都有一个与之对应的**变量对象**（类似消息队列，每个消息都有与之对应的函数）用于保存当前环境定义的变量和函数。

​	全局执行环境是最外部的执行环境，以浏览器为例，全局执行环境对应的变量对象是window对象

**作用域链的前端永远都是当前执行环境对应的变量对象。**

其中发生的作用域链变化如下所示：

初始环境：作用域链中只有window

1. 在全局作用域中调用outer.创建一个outer的执行环境；将outer推入执行栈，在outer执行的时候，创建一个作用域链。将outer对应的**活对象**（一个包含arguments的不可编码访问对象）放入作用域链首部；同时，将执行代码的控制权从window交给outer。
2. 调用inner,创建inner的执行环境，并将inner推入执行栈，在inner执行的时候，创建一个活对象，并把该对象加到作用域链的首部，将控制权从outer移交给inner。
3. inner执行结束。释放inner的作用域链中的活对象，释放控制权到outer.（同时释放了活对象占用的内存）
4. outer执行结束，释放outer的作用域链中的活对象，释放控制权到window.（同时释放了活对象占用的内存）

```javascript
function outer(){
  let a = "outera";
  return function inner(){
    console.log(a);
  }
}
outer();
```

   以上代码，返回一个inner函数到全局作用域。由于没有指向返回函数的指针，被返回的函数会被垃圾回收机制回收。不会造成内存溢出

   若将`outer()`改为`let result = outer();`则：

   由于有引用指向返回的函数，则result指向的函数中的作用域链不可被销毁，则该作用链所对应的活对象就不可被销毁。（此时outer的作用域链由于outer的执行结束已被销毁，但outer对应的活对象由于被返回的函数的作用域链所引用，所以依旧存在内存中。）

#### 原型链 -继承

如何理解原型链：

​	原型链就是在javascript中，所有的对象都有一个属性指向创建他的函数的原型对象。

