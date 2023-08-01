## 对 React Hooks 的理解，它解决了什么问题

---
### React Hooks 是什么

    - Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性

### React Hooks 解决了什么问题

    - 解决在共享组件中难以重用状态相关的逻辑

    - 在复杂组件中，处理多个不同的 local state 时，每个生命周期可能会包含不相关的逻辑

    - 类组件里有this 的学习成本

### React Hooks 有哪些

    - useState：在类组件里需要先在constructor 里声明state，然后在对应位置里修改state。
    - useEffect：相当于 componentDidMount 【初始化时只加载一次】；componentDidUpdate【依赖项更新时，触发更新】，componentWillUnmount【执行组件的清除】
    - useRef：相当于类组件里的ref
    - useCallback：用于缓存函数，只有依赖项变化时，才会重新创建函数
    - useMemo：被用来缓存结算结果，只有在依赖项发生变化时才会重新计算【计算量很大时缓存结果】

    useCallback 和 useMemo 的区别：useCallback只返回 fn 函数而不调用；useMemo 调用 fn 并返回其结果

#### React Hooks 有哪些
    useState 示例
    ```
        class Example extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                count: 0
                };
            }
            render () {
                return ()
            }
        }

        function Example () {
            const [key, setKey] = useState('aaa');
            return (<div onClick={() => { setKey('bb')}}>测试区域{key}</div>)
        }
    ```
    useEffect示例
    ```
        useEffect(() => {
            document.body.appendChild(xxxx);
            return () => {
                document.body.removeChild(xxxx);
            };
        }, []);
    ```
        
### React Hooks 解决哪些问题

    1. 每次调用 hooks 会生成一份独立的状态

    2. 通过自定义hook 能更好的封装我们的状态

