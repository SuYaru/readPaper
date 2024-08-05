# promise then

```java
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
class MyPromise {
  status = PENDING; // pending,fulfilled,rejected

  value = null; // 成功之后的值
  reason = null; // 失败之后的reason

  resolveCallback;
  rejectCallback;

  constructor (executer) {
    if (!executer) {
      return;
    }
    executer(this.resolve, this.reject);
  }

  resolve = (v) => {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = v;
      this.resolveCallback?.forEach((cb) => {
        cb(v);
      });
      this.resolveCallback = [];
    }
  };

  reject = (e) => {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = e;

      // while (this.rejectCallback.length > 0) {
      //   this.rejectCallback.shift()(e);
      // }
      this.rejectCallback?.forEach((cb) => {
        cb(e);
      });
      this.rejectCallback = [];
    }
  };

  then (onSuccess, onError) {
    const _this = this;

    return new MyPromise((res, rej) => {
      if (this.status === FULFILLED) {
        onSuccess(this.value);
      }
      if (_this.status === REJECTED) {
        onError(this.reason);
      }

      // 调用then的时候，executer中的执行还没有结束，this.resolve还没有被调用，则把resolve和reject的回调放入队列。
      if (this.status === PENDING) {
        this.resolveCallback.push(onSuccess);
        this.rejectCallback.push(onError);
      }
    });
  }
}
```

