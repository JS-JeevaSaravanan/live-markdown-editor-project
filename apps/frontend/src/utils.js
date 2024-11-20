// WebSocket handling logic (for sending Markdown to WebSocket)
const socket = new WebSocket("ws://localhost:5002");

const sendMarkdownViaWebSocket = (chunk) => {
  return new Promise((resolve, reject) => {
    socket.onopen = () => {
      socket.send(chunk);
    };

    socket.onmessage = (event) => {
      resolve(event.data); // Return HTML chunk
    };

    socket.onerror = (error) => {
      reject(error);
    };
  });
};

const convertChunk = async (chunk, cache) => {
  try {
    // Attempt WebSocket if it's open
    return await sendMarkdownViaWebSocket(chunk);
  } catch (error) {
    // Fallback to HTTP if WebSocket fails
    console.error("Error converting Markdown chunk:", error);
    return "<p style='color: red;'>Conversion failed</p>";
  }
};

// Splitting markdown into smaller chunks (to process in parts)
const splitMarkdownToChunks = (markdownText, chunkSize = 1000) => {
  const chunks = [];
  let currentChunk = "";

  const blocks = markdownText.split(/\n{2,}/); // Split at double newlines

  blocks.forEach((block) => {
    if ((currentChunk + block).length + 1 > chunkSize) {
      chunks.push(currentChunk);
      currentChunk = block;
    } else {
      if (currentChunk.length > 0) {
        currentChunk += "\n\n" + block;
      } else {
        currentChunk = block;
      }
    }
  });

  if (currentChunk) {
    chunks.push(currentChunk);
  }

  return chunks;
};

const processMdToHTML = async (markdown, cache) => {
  const chunks = splitMarkdownToChunks(markdown); // Split markdown into chunks

  const htmlChunks = await Promise.all(
    chunks.map(async (chunk) => {
      if (chunk.trim()) {
        if (cache.current.has(chunk)) {
          return cache.current.get(chunk); // Return cached HTML
        }
        return await convertChunk(chunk, cache); // Convert using WebSocket or HTTP
      }
      return ""; // Empty chunk
    })
  );

  return htmlChunks.join(""); // Combine processed chunks into HTML
};

export { processMdToHTML };
