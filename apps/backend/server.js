const express = require("express");
const cors = require("cors");
const { marked } = require("marked");
const WebSocket = require("ws");

const app = express();
app.use(cors());
app.use(express.json());

const wss = new WebSocket.Server({ noServer: true });

wss.on("connection", (ws) => {
  ws.on("message", async (markdownChunk) => {
    try {
      if (Buffer.isBuffer(markdownChunk)) {
        markdownChunk = markdownChunk.toString("utf-8");
      }

      const html = marked(markdownChunk);
      ws.send(html);
    } catch (error) {
      console.error("Error processing markdown:", error);
      ws.send("Error converting markdown.");
    }
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

app.server = app.listen(5002, () => {
  console.log("Express server running on http://localhost:5002");
});

app.server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});
