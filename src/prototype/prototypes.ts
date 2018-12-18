
Promise.prototype.map = function <F, T>(transformer: (f: F) => T): Promise<T> {
  return this.then((from: F) => transformer(from))
};


Promise.prototype.do = function <T>(handler: (f: T) => void): Promise<T> {
  return this.then((from: T) => {
    handler(from);
    return this;
  })
};

Promise.prototype.delay = function <T>(ms: number): Promise<T> {
  return this.then((from: T) => Promise.timer(ms).then(() => from))
};

Promise.prototype.timeout = function <T>(ms: number): Promise<T> {
  const timer = Promise.timer(ms).flatMap(() => Promise.error("Timeout error"));
  return Promise.race([this, timer])
};

Promise.prototype.flatMap = function <T, TO>(mapper: (v: T) => Promise<TO>): Promise<TO> {
  return this.then((from: T) => mapper(from))
};

Promise.constructor.prototype.of = function <T>(value: T): Promise<T> {
  return Promise.resolve(value)
};

Promise.constructor.prototype.error = function (error: any): Promise<void> {
  return Promise.reject(error)
};

Promise.constructor.prototype.zip = function <T1, T2, R>(v1: Promise<T1>, v2: Promise<T2>, accum: (a1: T1, a: T2) => R): Promise<R> {
  return Promise.all<T1, T2>([v1, v2]).map((x: [T1, T2]) => accum(x[0], x[1]))
};

Promise.constructor.prototype.timer = function (ms: number): Promise<void> {

  if (ms < 0) throw new Error("Negative timer");

  if (!ms) {
    return Promise.resolve();
  } else {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), ms)
    });
  }

};
