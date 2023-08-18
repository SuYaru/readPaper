## 对 React Hooks 的理解，它解决了什么问题

---
### 在需要插入大量DOM 的场景下，原生和React 分别会怎么做？

    1.原生：创建文档片段，将DOM元素全部放入后，再统一插入，只会渲染一次
        var fragment = document.createDocumentFragment();
        for (let i=0;i<1000;i++) {
            let li = document.createElement('li');
            li.innerHTML = 'li标签';
            fragment.appendChild(li);
        }
        document.body.appendChild(fragment);

    2. React：使用 React.Fragment
        const TableData = () => {
            return (
                <React.Fragment>
                <td>John Doe</td>
                <td>16</td>
                <td>Developer</td>;
                </React.Fragment>
            );
        }

        class App extends React.Component{
            render(){
                return ( <TableData />)
            }  
        }

        ReactDOM.render(<App/>,document.getElementById('root'));

### createDocumentFragment 和 React.Fragment 相比，后者有什么优势？

共同点：

    1. fragment解决作为子元素时，无需添加额外的DOM节点，从而允许从React组件中返回多个元素

    2. React.Fragment 还提供了简写形式：<></>：负载更低，但不能使用 key prop
    
    

React.Fragment 优势：

    1. React.Fragment 可读性更高

    2. 有一个更小的DOM，渲染更快，使用更少的内存
    
    3. 原生div有更多的方法和属性，导致消耗了更多的内存。且原型链更长：HTMLDivElement --> HTMLElement --> Element --> Node --> EventTarget；而 React.Fragment 为 DocumentFragment --> Node --> EventTarget
    
    4. React.Fragment 可以使用 key 

