const { Buffer } = require("node:buffer");

// Display the size of the pre-initialized buffer pool in kilobytes.
console.log(Buffer.poolSize / 1024); // Output: 8 Kilobyte

/*
 * Node.js has a pre-initialized memory location of 8 kilobytes.
 * This memory can be utilized by the `allocUnsafe()` method.
 * Using this method greatly increases performance, as there is no need to allocate
 * a new block of memory if the required size exceeds 8 KiB divided by 2 (4 KiB).
 * In other words, we can use this memory for buffer sizes less than 4096 bytes.
 */

/*
 * The ">>>" operator shifts bits to the right by one position.
 * This operation is similar to division but is more efficient for the computer.
 */
console.log(60 >>> 1); // Output: 30 (60 / 2)
console.log(30 >>> 1); // Output: 15 (30 / 2)

/*
 * Here we define a buffer of size 1000 bytes.
 * Note: This method clears the allocated memory, which can add overhead time.
 */
const buffer = Buffer.alloc(1000);

/*
 * This method allocates a buffer of size 1,000,000 bytes (1 MB).
 * However, it does not clear the allocated memory,
 * so be cautious as it may contain sensitive data from previous use.
 */
const unsafeBuffer = Buffer.allocUnsafe(1e6); // 1,000,000 bytes

/*
 * The following methods are optimized for speed.
 * They use `allocUnsafe` internally but immediately fill the allocated memory with data.
 */
const fromBuffer = Buffer.from([]); // Create a Buffer from an array (empty)
const concatBuffer = Buffer.concat([], []); // Concatenate multiple Buffers (empty)

/*
 * This method does not use pre-initialized memory, making it slightly slower.
 * It allocates a buffer of size 1000 bytes without pre-initialized memory.
 */
const slowUnsafeBuffer = Buffer.allocUnsafeSlow(1000);
