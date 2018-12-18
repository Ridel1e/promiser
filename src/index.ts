function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {

    let img    = new Image();
    img.src    = 'https://www.wikipedia.org/portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png';
    img.onload = () => {
      resolve(img)
    };
  });
}


Promise.of({width: 566})
  .map(img => img.width)
  .do(w => console.log(w));


Promise.zip(loadImage('objects'), loadImage('objects'), (x, y) => ({width: x.width + y.width}))
  .map(img => img.width)
  .do(w => console.log(w));

Promise.timer(5000)
  .map(() => ({width: 331}))
  .do(w => console.log(w));

loadImage('objects')
  .do(i => console.log(i))
  .flatMap(i => Promise.timer(2000))
  .do(w => console.log(w));


loadImage('objects')
  .do(i => console.log(i))
  .delay(2000)
  .do(w => console.log(w));



Promise.timer(1000)
  .do(i => console.log("1st"))
  .timeout(2000)
  .do(w => console.log("2d"))
  .catch(e => console.warn("ERROR", e));