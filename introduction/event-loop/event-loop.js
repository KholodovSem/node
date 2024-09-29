console.log("first"); // (1)

(async () => {
  let counter = 0;
  for (let i = 0; i < 100000000; i++) {
    counter++;
  }
  console.log("second"); // (2)

  await asyncFunction();
  console.log("third"); // (4)
})();

console.log("fourth"); // (3)

function asyncFunction() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve();
    }, 2000);
  });
}
