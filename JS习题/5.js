// 如何突破 localStorage 的大小限制?

每个域下有5M的限制;
// 通过 try catch 包裹 window.localStorage.setItem
// 保存到别的域名下，如通过postMessage
