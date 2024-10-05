function debounce(fn, timeout = 300) {
  let timer;
  // this will be taken from here
  return function (...args) {
    // this fn doesn't have own "this", it sealing "this" from the outside scope
    clearTimeout(timer);
    timer = setTimeout(() => {
      // this fn doesn't have own "this", it sealing "this" from the outside scope
      fn.apply(this, args);
      // This is for the case when we need to debounce the method
    }, timeout);
  };
}

const person = {
  name: "Sem",
  sayHello: debounce(function () {
    console.log("Hello" + " " + this.name);
  }),
};

person.sayHello();
