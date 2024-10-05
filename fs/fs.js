/*
    Here's tree different ways to deal with a file:
        - Promises API (more clear way without blocking application)
        - Callback API (more faster way)
        - Synchronous API (try to avoid it)
*/

const path = require("node:path");
const fsAsync = require("node:fs/promises");

// Promises API
(async () => {
  try {
    await fsAsync.copyFile(
      path.resolve(__dirname + "/command.txt"),
      path.resolve(__dirname, "copied-command-promise.txt")
    );
  } catch (error) {
    console.log(error);
  }
})();

// Callback API
const fsCallback = require("node:fs");

fsCallback.copyFile(
  path.resolve(__dirname + "/command.txt"),
  path.resolve(__dirname, "copied-command-callback.txt"),
  (err) => {
    if (err) {
      console.log(err);
    }
  }
);

// Synchronous API
const fsSync = require("node:fs");

fsSync.copyFileSync(path.resolve(__dirname + "/command.txt"), path.resolve(__dirname, "copied-command-sync.txt"));
