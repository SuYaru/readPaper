# js基础

## js相关

- js中的基本类型及判断类型的方法
   - boolean undefined number string null symbol
   - type of "" 判断基本类型，除了null之外都是准确值。判断复杂类型为object
   - Object.prototype.toString.call('')会返回一个对象的描述信息，如果没有覆盖的话会返回“[object type]”
- 什么是原型链
   - 每个实例都有一个指向原型的指针，每一个实例对象的原型都有可能是另外一个function的实例，由此形成的链式结构叫做原型链
- 什么是js中的类，有什么优缺点
   - js中的类就是函数，
- 继承的几种实现方式
   - 组合式继承
   - 原生继承
   - 寄生式继承
- 在原型上的方法和在构造函数上的方法有什么区别
   - 原型上的方法在实例中共享，构造函数中的方法是每个实例私有的
- 如何理解作用域链和作用域
   - 变量取值到当前的代码执行块的作用域去取，找不到则到上级作用域去找，以此形成的链式结构就是作用域链
- 什么是闭包，毕包的应用场景
   - 函数和其所在作用域的引用捆绑在一起时，就形成了闭包：例如，创建一个函数，如果该函数引用到了全局变量，则该函数就是一个闭包。或者在函数内有一个函数，内函数访问外部函数的变量则内部函数是一个闭包。
   - 闭包本身不会造成内存泄漏，造成内存泄漏的是不恰当的使用，当某个闭包引用的变量得不到释放的时候会造成内存泄漏
- 什么是模块化
   - 将大的程序拆分成许多互相依赖的小文件，然后再用简单的方法拼装起来
   - commonJs 一般用于服务端，因为其无法异步加载，在客户端容易造成卡顿
   - amdjs一般用于客户端，可以异步加载。
- es6模块和commonJs的区别
   - commonJs导出的是一个对象的浅拷贝，有缓存，在加载的时候执行一次。
   - es6模块导出的是一个引用，可以读取到更改后的值，不可以对对象重新赋值
- Array有哪些方法
   - 返回值
      - map 对数组中的每一项进行一种计算操作，无法对原数组进行修改，返回一个新的数组，和原数组等长,如果有未进行计算的则会返回undefined
      - filter  对进行过滤，返回数组中满足条件的项目，无法对原数组进行修改，返回一个新的数组，有可能和原数组等长
      - Some 返回一个boolean值，表示是否包含某一项满足条件
      - Every 返回一个boolean值，表示是否每一项都满足传入的函数
   - 无返回值
      - forEache 不会改变原数组
      - reduce 不会改变原数组
- Array的sort方法的时间复杂度是多少？
[Tim sort, the fastest sort used in v8 and Python](https://dev.to/jennieji/tim-sort-the-fastest-sort-used-in-v8-and-python-5e76)

- 自定义实现一个flat
```javascript
function myFlat(array){
	if(isArray(array)){
		for(let item of array){
			return myFlat(array)
		}
    }else{
return array

}
}
```

- 什么是执行上下文
   - 当前执行环境，定义了变量或者函数有权访问的数据
- 什么是执行栈
   - 代码在执行的时候，会有一个栈的结构，当某个代码执行的时候，该代码所在的执行环境会被推入栈中，执行结束之后出栈。
- 作用域链是什么
   - 作用域链是保证对执行环境中有权访问的数据被有序访问，每个执行环境都有一个作用域链，作用域链可以理解为一个队列类型的数据结构，队头保持着当前执行环境的变量对象（变量对象中包含着当前可访问的数据），当前环境执行结束之后，作用域链就会将当前环境的活对象释放以回收内存，将程序的控制权移交给下一个执行环境（执行栈）。
- eventLoop 详细解读（微任务、宏任务）
   - 一个循环是指，当执行栈中的同步任务执行结束之后，会去微任务队列中执行微任务的回调函数。微任务队列为空之后，去宏任务队列中取一个宏任务放入执行栈中，进入下一个循环(回调函数执行时)，当前宏任务回调中的微任务会进入当前循环的微任务队列。
- js异步机制
   - 执行栈中为同步任务，遇到异步任务会放入异步队列中等待获得。
- 作用域有哪几种
   - 全局作用域、局部作用域

promise执行顺序：微任务和宏任务

```javascript
console.log('script start');

setTimeout(function() {
  console.log('timeout1');
  new Promise(resolve=>{
        console.log('promise in timeout1');
        resolve();
      }).then(()=>{console.log('promise in timeout1 then')});
  
}, 1000);

new Promise(resolve => {
    console.log('promise1');
    resolve();
    setTimeout(function(){
      console.log('timeout2');
      new Promise(resolve=>{
        console.log('promise in timeout2');
        resolve();
      }).then(()=>{console.log('promise in timeout2 then')})
    }, 20000);
}).then(function() {
    console.log('promise1 then1')
}).then(function(){
  console.log('promise1 then then 1');
});

console.log('script end');
var start = new Date();
var end = start.getTime()+5000;
while((end - start)>=0){
  end--;
  console.log(end);
}
console.log('after 20000000')
```

