const { Buffer } = require("node:buffer");

/*
 * Buffer is a container for storing raw binary data in memory.
 *
 * - By default, a newly created Buffer is initialized with zero values.
 * - In Node.js, each element of a Buffer is exactly 8 bits (1 byte).
 * - Although a Buffer behaves like an array, it is not a true array.
 * - The size of a Buffer is fixed upon creation, meaning you cannot change its size later.
 */

// Allocate a Buffer of 4 bytes (32 bits), initialized to zeros:
// 0000 0000 0000 0000 0000 0000 0000 0000
const memoryContainer = Buffer.alloc(4);

/*
 * Note: Each element of the Buffer contains exactly 8 bits.
 * This means we have four elements in "memoryContainer" currently,
 * and each element can be displayed in hexadecimal format.
 */
memoryContainer[0] = 0xf4; // Set the first byte to 0xf4
memoryContainer[1] = 0x34; // Set the second byte to 0x34
memoryContainer[2] = 0xb6; // Set the third byte to 0xb6
memoryContainer[3] = 0xff; // Set the fourth byte to 0xff

// Display the entire Buffer as hexadecimal values.
console.log(memoryContainer);

// Display each individual byte as a decimal value.
console.log(memoryContainer[0]); // Output the first byte in decimal
console.log(memoryContainer[1]); // Output the second byte in decimal
console.log(memoryContainer[2]); // Output the third byte in decimal
console.log(memoryContainer[3]); // Output the fourth byte in decimal

// Create a Buffer to store the letters of the alphabet (26 bytes).
const alphabet = Buffer.alloc(26);

/*
 * Fill the Buffer with ASCII values representing lowercase letters (a-z).
 * ASCII 'a' starts at 97, so we write the values 97 to 122 (for a-z).
 */
alphabet.forEach((_, index) => {
  alphabet.writeInt8(97 + index, index);
});

// Convert the Buffer to a string and display the alphabet.
console.log(alphabet.toString("ascii")); // Output: "abcdefghijklmnopqrstuvwxyz"
