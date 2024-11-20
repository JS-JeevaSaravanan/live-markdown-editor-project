const express = require("express");
const cors = require("cors");
const { marked } = require("marked");
const crypto = require("crypto");
const WebSocket = require("ws"); // WebSocket library

const app = express();
app.use(cors());
app.use(express.json());

const cache = new Map(); // In-memory cache (consider Redis for production)

const generateHash = (input) =>
  crypto.createHash("md5").update(input).digest("hex");

// WebSocket server setup
const wss = new WebSocket.Server({ noServer: true });

wss.on("connection", (ws) => {
  console.log("Client connected via WebSocket");

  // Handle incoming messages (markdown chunks)
  ws.on("message", async (markdownChunk) => {
    // console.log("Received markdown chunk:", markdownChunk);

    try {
      // If the message is a Buffer, convert it into a string (text)
      if (Buffer.isBuffer(markdownChunk)) {
        markdownChunk = markdownChunk.toString("utf-8"); // Convert Buffer to a string
      }

      // Convert markdown chunk to HTML
      const hash = generateHash(markdownChunk);
      let html = "";

      if (cache.has(hash)) {
        // If chunk was previously converted and cached
        html = cache.get(hash);
      } else {
        html = marked(markdownChunk); // Convert markdown to HTML
        cache.set(hash, html); // Cache the result
      }

      // Send back the HTML chunk
      ws.send(html);
    } catch (error) {
      console.error("Error processing markdown:", error);
      ws.send("Error converting markdown.");
    }
  });

  // Handle WebSocket errors
  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });

  // Handle WebSocket closure
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

// Upgrade HTTP server to handle WebSocket connections
app.server = app.listen(5002, () => {
  console.log("Express server running on http://localhost:5002");
});

// Handle WebSocket upgrade requests from HTTP
app.server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});
