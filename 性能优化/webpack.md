### webpack自定义插件

1. 以class 形式构建插件
2. webpack 的时间节点：

    1）entryOption：webpack 读取所有入口文件

    2）run: 进入构建环节

    3）make: compilation实例被创建出来。启动对代码的编译和构建

    4）emit: 操作打包后的文件可以在emit阶段编写plugin实现

    5）done: 构建结束时触发

3. webpack 中有两个很重要的概念，compiler 和 compilation

   1）compiler是webpack的执行器，控制着程序的执行，有6个钩子函数，会从左到右执行依次执行每一个钩子定义的监听事件队列

   2）compiler: webpack 接收options 参数可以得到compiler对象
    ```
        // compiler
        const webpack = require("webpack");
        const options = require("../webpack.config.js");
        const compiler = webpack(options);
        compiler.run();
    ```

    3）compilation：在make阶段内创建，也是作为apply 的参数

4. 在插件安装时，会调用内部的 apply 方法：new MyWebpackPlugin.apply(compiler)

5. 常用的webpack插件：

   HtmlWebpackPlugin: 创建一个 html 文件，并把 webpack 打包后的静态文件自动插入到这个 html 文件当中
   MiniCssExtractPlugin: 为每个包含css 的 js 创建一个css 文件，支持css 和 SourceMap 的按需加载
   WebpackBundleAnalyzerPlugin: 生成代码分析报告，帮助提升代码质量和性能
   CleanWebpackPlugin: 第二次打包时会将原有包清空，减少对磁盘的占用

6. 自行创建一个webpackPlugin：

    存在异步钩子（实现异步请求）和同步钩子

    ```
    class MyWebpackPlugin {
        constructor (options, open) {
            this.options = options
            this.isOpen = open
        }
        apply(compiler) {
            // 使用hooks在钩子上注册事件
            compiler.hooks.emit.tapAsync('MyWebpackPlugin', (compilation, callback) => {
                // 可以操作 MiniCssExtractPlugin
            });
            // compiler使用plugin在钩子上注册事件. "compilation": Compilation实例生成时
            compiler.plugin('compilation', (compilation) => {
                if (HtmlWebpackPlugin && typeOf HtmlWebpackPlugin.getHooks === 'function') {
                    HtmlWebpackPlugin.getHooks(compilation).tabAsync(
                        'MyWebpackPlugin',
                        (params, cb) => {
                            // params 与 options 经过一些判断与处理
                            cb(null, params)
                        }
                    )
                }
            })
        }
    }
    module.exports = MyWebpackPlugin
    ```

    其中解释一下 tabAsync 在callAsync之后调用。若同时存在多个 tabAsync，则依次调用
    ```
    const { AsyncSeriesHook } = require("tapable");  
    const workHook = new AsyncSeriesHook(["arg1"]);  
    workHook.tapAsync("openComputer",(arg,next)=>{ //绑定事件    
    setTimeout(()=>{         
        console.log(`打开电脑:${arg}`);         
        next();              
    },1000)  
    })  
    workHook.tapAsync("todoList",(arg,next)=>{ //绑定事件     
    setTimeout(()=>{         
        console.log(`列出日程安排:${arg}`);         
        next();              
    },1000)  })  
    workHook.tapAsync("processEmail",(arg,next)=>{ //绑定事件     
    setTimeout(()=>{         
        console.log(`处理邮件:${arg}`);         
        next();              
    },2000) })  
    workHook.callAsync("工作阶段",()=>{ //触发事件     
    console.log(`异步任务完成`)  // 所有异步任务全部执行完毕,回调函数才会触发  
    }); 
    ```
    结果：开始刷牙:准备阶段 正在洗脸:准备阶段 吃早餐:准备阶段

7. 插件使用：
![Alt text](<Pasted Graphic 4.png>)

