# react

hooks的限制条件、是因为链表

# useLayoutEffect和useEffect的执行顺序

```javascript
console.log('execute 1');
  useLayoutEffect(() => {
    console.log('useLayoutEffect1');
  });
  console.log('execute 2');

  useEffect(() => {
    console.log('useEffect1');
  });
  console.log('execute 3');

  useLayoutEffect(() => {
    console.log('useLayoutEffect2');
  });
  console.log('execute 4');

  useEffect(() => {
    console.log('useEffect2');
  });
  console.log('execute 5');
// 执行结果

// 1
// 2
// 3
// 4
// 5
// useLayoutEffect1
// useLayoutEffect2
// useEffect1
// useEffect2
```

requestIdelCallback时期执行

react的diff过程

fiber 是为了解决什么问题

fiber的原理，requestIdelCallback，是如何 hack requestIdelCallback

react hooks =》原理

哪些hooks

fiber diff的过程

useLayoutEffect和useEffect的执行顺序

jsx=>dom 的过程

useMemo useCallback 的区别

18  有什么特性、改了哪些接口

react.create() .redner

redner.(dom,child)

