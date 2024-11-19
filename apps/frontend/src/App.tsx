import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

const App = () => {
  const [markdown, setMarkdown] = useState("");

  const handleInputChange = (e: any) => setMarkdown(e.target.value);

  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
      {/* Markdown Editor */}
      <textarea
        style={{ width: "45%", height: "90vh", fontSize: "16px" }}
        value={markdown}
        onChange={handleInputChange}
        placeholder="Type Markdown here..."
      />

      {/* Live Preview */}
      <div
        style={{
          width: "45%",
          height: "90vh",
          overflowY: "auto",
          border: "1px solid #ddd",
          padding: "10px",
        }}
      >
        {/* <ReactMarkdown>{markdown}</ReactMarkdown> */}
        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default App;
