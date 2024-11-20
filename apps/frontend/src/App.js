import { useState, useCallback } from "react";
import axios from "axios";

const App = () => {
  const [markdown, setMarkdown] = useState("");
  const [htmlOutput, setHtmlOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const axiosInstance = axios.create({
    baseURL: "http://localhost:5002", // Backend URL
    withCredentials: false,
  });

  // Debounced function to reduce API calls
  const convertToHtml = useCallback(
    debounce(async (md) => {
      try {
        setLoading(true);
        const response = await axiosInstance.post("/convert", { markdown: md });
        setHtmlOutput(response.data.html);
      } catch (error) {
        console.error("Error converting Markdown:", error);
        setHtmlOutput("<p style='color: red;'>Conversion failed</p>");
      } finally {
        setLoading(false);
      }
    }, 300), // 300ms debounce
    []
  );

  // Handle Markdown input change
  const handleInputChange = (e) => {
    const md = e.target.value;
    setMarkdown(md);
    if (md.trim()) {
      convertToHtml(md);
    } else {
      setHtmlOutput("");
    }
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
