const EventEmitter = require("node:events");

// Emitter initialization
const emitter = new EventEmitter();

// Handling events with arguments
emitter.on("addition", (n1, n2) => console.log(n1 + n2));
emitter.emit("addition", 1, 2);

// "This" arguments in events
function onThisFunction() {
  console.log(this);
}
const onThisArrowFunction = () => {
  console.log(this);
};
emitter.on("this", onThisFunction); // emitter
emitter.on("this", onThisArrowFunction); // {}
emitter.emit("this");

// Sync handling
console.log("Before sync");
emitter.on("sync", () => console.log("sync event"));
emitter.emit("sync");
console.log("After sync");

// Async handling
console.log("Before async");
emitter.on("async", () => setImmediate(() => console.log("async event")));
emitter.emit("async");
console.log("After async");

// Handling once
emitter.once("someEvent", () => console.log("Once event"));
emitter.emit("someEvent");
emitter.emit("someEvent");
emitter.emit("someEvent");

// Handling errors
emitter.on("error", () => console.log("Error ocurred"));
emitter.emit("error", new Error("error"));

// Handling rejections
const emitter2 = new EventEmitter({ captureRejections: true });

emitter2.on("rejection", () => {
  return new Promise((res, rej) => {
    rej(new Error("rejected"));
  });
});

emitter2[Symbol.for("nodejs.rejection")] = function (error) {
  console.log(error.message);
};

emitter2.emit("rejection");
