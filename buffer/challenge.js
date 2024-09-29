// 0100 1000 0110 1001 0010 0001
// 0x48  0x69  0x21

//0x486921

const { Buffer } = require("node:buffer");

const buffer = Buffer.alloc(3);
buffer.writeInt8(0x48, 0);
buffer.writeInt8(0x69, 1);
buffer.writeInt8(0x21, 2);

console.log("Buffer 1: ", buffer.toString());

const buffer2 = Buffer.from([0x48, 0x69, 0x21]);
console.log("Buffer 2: ", buffer2.toString());

const buffer3 = Buffer.from("486921", "hex");
console.log("Buffer 3: ", buffer3.toString("utf-8"));
