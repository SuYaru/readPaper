# 浏览器、session等相关知识

## html相关

- 如何理解语义化标签
   - 具有含义的html标签，用来描述内容和意义：example: <p> <br>
- 重排和重绘的区别
   - 重排：重新排列，dom的高度、宽度、top值等位置发生变化、position
   - 重绘：颜色等发生变化。
- 如何解决跨域
   - jsonp，通过服务端配合，在参数中带上回调函数的名字，通过script标签引用，利用标签可以跨域的特点，当执行该标签时，通过url中的回调函数进行函数调用
   - 服务端配置
      - cors(跨域资源共享)：通过后端配置允许访问的域名。
   - window.domain设置二级域名一致
   - Window.postMessage和window.onMessage(“事件名“，”地址“)进行消息传递
   - iframe通过window.open url传参，在url中拼接需要用到的数据
- 浏览器本地存储的类型
   - localStorage
      - 只有用户清空缓存或者代码级别的清空时，数据才会清除
      - 遵守同源策略
   - sessionStorage
      - 刷新浏览器不会清除
      - 关闭浏览器会清除
      - 复制标签页会带入且与原sessionStorage隔离
      - “在新标签页中打开”不会带入sessionStorage
      - 遵守同源策略
- cookie的作用域
   - cookie一般用来做用户身份有效性的验证。可以存放token等其他用户自定义的信息。
   - cookie遵守同源策略的同时，还有一个path属性可以设置作用域，在设置cookie的时候，可以指定路径，表明该cookie只在特定的路径下可以访问到。默认为根路径
- cookie和session的区别
   - cookie存放在客户端，session存放在服务端。session是每个会话都会有一个session.cookie是可以共享的。

   cookie是识别当前用户，**实现持久会话的一种方式**。cookie由服务器生成， 在客户端第一次访问服务器后，由服务器设置响应头中的Set-cookie为客户端设置一个cookie，用来标示客户端。分为会话cookie和长久cookie两种。

   会话cookie：

   ​	记录了用户访问站点时的设置和偏好，退出浏览器会被删除（Set-cookie:无Discard参数，Expires或者Max-age说明过期时间，则cookie是临时cookie）

   持久cookie:

   ​	存储在硬盘上，重启仍然存在。直到过期为止

   session->服务端机制，是服务器生成一个session对象，每次会话这个session对象存储在服务器中，每一个session对象对应一个sessionId,一般情况下，服务器会将sessionId放入cookie，会话结束，删除cookie.sessionId.下次访问，如果是会话cookie则sessionId被删除。找不到之前生成的session对象，需要给session设置过期时间以删除，防止内存溢出。

   如果是持久cookie，则可以继续使用原来的session。

   session只有在服务器端，调用删除session的代码的时候才会被删除，创建同理。（服务被调用，自动创建-默认true，除非显示关闭）

`requestIdleCallback` 和 `requestAnimationFrame` 是两个用于在浏览器中执行异步操作的函数。它们的执行顺序是不确定的，取决于浏览器的实现和当前的系统负载情况。

`requestIdleCallback` 是一个在浏览器空闲时执行的函数，它会在浏览器的事件循环中的空闲时段执行回调函数。它的目标是在浏览器空闲时执行一些低优先级的任务，以避免阻塞主线程。

