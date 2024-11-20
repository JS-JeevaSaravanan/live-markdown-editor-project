import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5002", // Backend URL
  withCredentials: false,
});

const convertChunk = async (chunk, cache) => {
  try {
    // console.log("### request chunk:", chunk);
    const response = await axiosInstance.post("/convert", { markdown: chunk });
    const chunkHtml = response.data.html;
    cache.current.set(chunk, chunkHtml);
    return chunkHtml;
  } catch (error) {
    console.error("Error converting Markdown chunk:", error);
    return "<p style='color: red;'>Conversion failed</p>";
  }
};

function splitMarkdowns(markdownText) {
  // split markdown into chunks 
  // return markdownText.split(/\n\s*\n/);

  return (markdownText.split(/\n\n+/))
}

function splitMarkdownToChunks(markdownText, chunkSize = 1000) {
  // split markdown into chunks 

  const chunks = [];
  let currentChunk = "";
  
  // Split the markdown into blocks based on double newlines (paragraphs)
  const blocks = markdownText.split(/\n{2,}/);  // Split at double newlines (paragraphs, list items, etc.)
  
  blocks.forEach(block => {
      // If adding this block exceeds the chunk size, start a new chunk
      if ((currentChunk + block).length + 1 > chunkSize) {
          chunks.push(currentChunk);
          currentChunk = block;  // Start a new chunk
      } else {
          // Append this block to the current chunk
          if (currentChunk.length > 0) {
              currentChunk += "\n\n" + block;
          } else {
              currentChunk = block;
          }
      }
  });

  // Add the last chunk if there's any leftover content
  if (currentChunk) {
      chunks.push(currentChunk);
  }

  return chunks;
}

const processMdToHTML = async (markdown, cache) => {
  // Split Markdown into chunks by double newlines (paragraphs)
  // const chunks = markdown.split(/\n/);
  const chunks = [markdown];
  // const chunks = markdown.split(/\n\s*\n/);

  // const chunks = splitMarkdowns(markdown);
  console.log('## chunks: ', chunks);

  const htmlChunks = await Promise.all(
    chunks.map(async (chunk) => {
      if (chunk.trim()) {
        if (cache.current.has(chunk)) {
          return cache.current.get(chunk);
        }
        return await convertChunk(chunk, cache);
      }
      return ""; // Preserve empty chunks
    })
  );

  // Combine processed chunks into final HTML output
  return htmlChunks.join("");
};

// Debounce utility function
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

export { processMdToHTML, debounce };
