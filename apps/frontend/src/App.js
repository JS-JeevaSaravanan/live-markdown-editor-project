import { useState, useCallback, useRef, useEffect } from "react";
import { processMdToHTML } from "./utils";

const App = () => {
  const [markdown, setMarkdown] = useState("");
  const [htmlOutput, setHtmlOutput] = useState("");
  const [loading, setLoading] = useState(false);

  // Cache for storing converted Markdown chunks
  const cache = useRef(new Map());

  // Function to process the entire Markdown input
  const processMarkdown = useCallback(async () => {
    setLoading(true);

    const newHtmlOutput = await processMdToHTML(markdown, cache);

    // Combine processed chunks into final HTML output
    setHtmlOutput(newHtmlOutput); // Add spacing between chunks
    setLoading(false);
  }, [markdown]);

  // Debounced Markdown processing
  const debouncedProcessMarkdown = useCallback(
    debounce(processMarkdown, 3000),
    [processMarkdown]
  );

  // Effect to trigger processing when Markdown changes
  useEffect(() => {
    debouncedProcessMarkdown();
  }, [markdown, debouncedProcessMarkdown]);

  // Handle Markdown input change
  const handleInputChange = (e) => {
    setMarkdown(e.target.value);
  };

  return (
    <div style={{ display: "flex", padding: "20px", gap: "10px" }}>
      <textarea
        style={{
          width: "45%",
          height: "90vh",
          fontSize: "16px",
          padding: "10px",
          border: "1px solid #ddd",
        }}
        value={markdown}
        onChange={handleInputChange}
        placeholder="Type Markdown here..."
      />

      <div
        style={{
          width: "45%",
          height: "90vh",
          overflowY: "auto",
          border: "1px solid #ddd",
          padding: "10px",
          background: "#f9f9f9",
        }}
      >
        {loading ? (
          <p style={{ color: "#888" }}>Converting...</p>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: htmlOutput }} />
        )}
      </div>
    </div>
  );
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

export default App;
