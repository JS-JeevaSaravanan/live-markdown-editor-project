import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5002", // Backend URL
  withCredentials: false,
});

const convertChunk = async (chunk, cache) => {
  try {
    console.log("### request chunk:", chunk);
    const response = await axiosInstance.post("/convert", { markdown: chunk });
    const chunkHtml = response.data.html;
    cache.current.set(chunk, chunkHtml);
    return chunkHtml;
  } catch (error) {
    console.error("Error converting Markdown chunk:", error);
    return "<p style='color: red;'>Conversion failed</p>";
  }
};

const processMdToHTML = async (markdown, cache) => {
  // Split Markdown into chunks by double newlines (paragraphs)
  const chunks = markdown.split(/\n/);
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
  return htmlChunks.join("<br><br>");
};

export { processMdToHTML };
