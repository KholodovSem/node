const { watch, open, rm, rename, access, constants, unlink } = require("node:fs/promises");
const { resolve } = require("node:path");
const { Buffer } = require("node:buffer");

const filePath = resolve(__dirname, "command.txt");

const watcher = watch(filePath);

const COMMANDS = {
  CREATE_FILE: "create a file",
  ADD_TO_FILE: "add to the file",
  RENAME_FILE: "rename a file",
  DELETE_FILE: "delete the file",
};

const COMMAND_HANDLERS = {
  createFile: async (filePath) => {
    const absolutePath = resolve(__dirname, filePath);

    try {
      await access(absolutePath, constants.F_OK);
      console.error("File already exist");
    } catch {
      await open(absolutePath, "w");
      console.log("File was successfully created");
    }
  },
  deleteFile: async (filePath) => {
    const absolutePath = resolve(__dirname, filePath);

    try {
      // symbolic link it's a just label (alias) for original file
      await unlink(absolutePath);
    } catch {
      console.error("the file doesn't exist");
    }
  },
  renameFile: async (filePath, newPath) => {
    const absolutePath = resolve(__dirname, filePath);

    try {
      await access(absolutePath, constants.F_OK);
      rename(absolutePath, newPath);
    } catch (e) {}
  },
  addToFile: async (filePath, content) => {
    const absolutePath = resolve(__dirname, filePath);

    try {
      const handler = await open(absolutePath, "a");
      await handler.write(content);
    } catch {
      console.error("the file doesn't exist");
    }
  },
};

/**
 *
 * @param {import("node:fs/promises").FileHandle} handler
 */
const onFileChange = async (handler) => {
  const { size } = await handler.stat();

  // If not specify will be taken default value:  Buffer.alloc(16384) or / 1000 = 16.384 kilobyte or / 1024 = 16 kibibyte
  const buff = Buffer.alloc(size);
  // It's buffer offset
  const offset = 0;
  // Number of bytes to read
  const length = buff.byteLength;
  // If not specify, will be taken current file position, that will be update with every read operation
  const position = 0;

  const result = await handler.read(buff, offset, length, position);

  const command = result.buffer.toString("utf8");

  // command: create a file <path>
  // create file by specified path
  if (command.includes(COMMANDS.CREATE_FILE)) {
    const filePath = command.substring(COMMANDS.CREATE_FILE.length + 1);
    COMMAND_HANDLERS.createFile(filePath);
  }

  // command: delete the file <path>
  // delete file by specified path
  if (command.includes(COMMANDS.DELETE_FILE)) {
    const filePath = command.substring(COMMANDS.DELETE_FILE.length + 1);
    COMMAND_HANDLERS.deleteFile(filePath);
  }

  // command: rename the file <path> to <new-path>
  // delete file by specified path
  if (command.includes(COMMANDS.RENAME_FILE)) {
    const SEPARATOR = " to ";
    const _idx = command.indexOf(SEPARATOR);

    const oldFilePath = command.substring(COMMANDS.RENAME_FILE.length + 1, _idx);
    const newFilePath = command.substring(_idx + SEPARATOR.length);

    COMMAND_HANDLERS.renameFile(oldFilePath, newFilePath);
  }

  // command: add to the file <path> this content: <content>
  // add content to the specified file
  if (command.includes(COMMANDS.ADD_TO_FILE)) {
    const SEPARATOR = " this content: ";
    const _idx = command.indexOf(SEPARATOR);

    const filePath = command.substring(COMMANDS.ADD_TO_FILE.length + 1, _idx);
    const content = command.substring(_idx + SEPARATOR.length);

    COMMAND_HANDLERS.addToFile(filePath, content);
  }
};

(async () => {
  /* 
      Before we can able to read file or do something else we need to open it.
      Every open file has "file descriptor" uniq non-negative number as id.
   */
  const fileHandler = await open(filePath, "r");
  fileHandler.on("change", onFileChange);

  for await (const event of watcher) {
    if (event.eventType === "change") {
      fileHandler.emit("change", fileHandler);
    }
  }
})();
