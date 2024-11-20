const express = require("express");
const cors = require("cors");
const { marked } = require("marked");
const crypto = require("crypto");

const app = express();
app.use(cors());
app.use(express.json());

const cache = new Map(); // In-memory cache (consider Redis for production).

// Generate a hash of the input Markdown for efficient caching.
const generateHash = (input) => crypto.createHash("md5").update(input).digest("hex");

app.post("/convert", (req, res) => {
  const { markdown } = req.body;
  if (!markdown) return res.status(400).json({ error: "No Markdown provided" });

  const hash = generateHash(markdown);
  if (cache.has(hash)) {
    return res.json({ html: cache.get(hash) }); // Serve from cache.
  }

  try {
    const html = marked(markdown);
    cache.set(hash, html); // Cache the result.
    res.json({ html });
  } catch (error) {
    console.error("Markdown conversion error:", error);
    res.status(500).json({ error: "Conversion failed" });
  }
});

const PORT = 5002;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
