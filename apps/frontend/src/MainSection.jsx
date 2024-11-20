import { useState, useEffect, useCallback, useRef } from "react";
import { processMdToHTML } from "./utils"; // Utility function to convert markdown to HTML
import { useDebounce } from "./customHooks"; 

const MainSection = ({
  isSidePanelOpen,
}) => {



  const [markdown, setMarkdown] = useState(""); // Markdown text state
  const [htmlOutput, setHtmlOutput] = useState(""); // HTML output state
  const [loading, setLoading] = useState(false); // Loading state
  
  const debouncedValue = useDebounce(markdown, 200); // Debounced markdown input value

  // Cache for storing converted Markdown chunks
  const cache = useRef(new Map());

  useEffect(() => {
    processMarkdown(debouncedValue);
  }, [debouncedValue]);

  const processMarkdown = useCallback(async (newMdText) => {
    setLoading(true);
    const newHtmlOutput = await processMdToHTML(newMdText, cache);
    setHtmlOutput(newHtmlOutput); // Update HTML output
    setLoading(false); // Set loading to false
  }, []);

  const handleInputChange = (e) => {
    setMarkdown(e.target.value); // Update markdown text state
  };



  const styles = {
    textarea: {
      width: isSidePanelOpen ? "50%" : "100%",
      height: "90vh",
      fontSize: "16px",
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      resize: "none",
    },
    htmlOutput: {
      width: isSidePanelOpen ? "50%" : "100%",
      height: "90vh",
      overflowY: "auto",
      border: "1px solid #ddd",
      padding: "10px",
      backgroundColor: "#f9f9f9",
    },
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      {/* Markdown Textarea */}
      <textarea
        style={styles.textarea}
        value={markdown}
        onChange={handleInputChange}
        placeholder="Type Markdown here..."
      />

      {/* HTML Output */}
      <div style={styles.htmlOutput}>
        {loading ? (
          <p style={{ color: "#888" }}>Converting...</p>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: htmlOutput }} />
        )}
      </div>
    </div>
  );
};

export default MainSection;
