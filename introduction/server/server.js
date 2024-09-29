const http = require("node:http");
const fs = require("node:fs");

const port = +process.env.PORT || 3000;

const server = http.createServer();

server.on("request", (req, res) => {
  const text = fs.readFileSync("./text.txt");

  res.setHeader("Content-Type", "text/plain");
  res.end(text);
});

server.on("error", (err) => {
  if (e.code === "EADDRINUSE") {
    console.log(`Port ${port} is already use`);
    server.close();
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log("Server has started on:", server.address());
});
