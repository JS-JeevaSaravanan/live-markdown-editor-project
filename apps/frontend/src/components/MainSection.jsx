import { useState, useEffect, useRef } from "react";
import { useDebounce } from "../hooks/useDebounce";
import MarkdownHTMLPreview from "./MarkdownHTMLPreview";

const MainSection = ({ activeFile, content, saveFile, isSidePanelOpen }) => {
  const [markdown, setMarkdown] = useState(content || ""); // State for markdown input
  const [htmlOutput, setHtmlOutput] = useState(""); // State for the HTML output
  const [loading, setLoading] = useState(false); // State to show loading indicator
  const [socketStatus, setSocketStatus] = useState("disconnected"); // WebSocket status

  const debouncedValue = useDebounce(markdown, 50); // Debounced markdown value
  const socketRef = useRef(null); // Ref to hold WebSocket instance

  useEffect(() => {
    setMarkdown(content || ""); // Sync markdown state with the content prop
  }, [content, activeFile]);

  // Effect for WebSocket connection
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:5002");
    socketRef.current = socket;

    socket.onopen = () => {
      setSocketStatus("connected");
      console.log("WebSocket connection established");
    };

    socket.onmessage = (event) => {
      setHtmlOutput(event.data); // Set the HTML output from WebSocket
      setLoading(false); // Hide loading indicator
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      setSocketStatus("error");
    };

    socket.onclose = () => {
      setSocketStatus("disconnected");
      console.log("WebSocket connection closed");
    };

    return () => {
      socket.close(); // Cleanup WebSocket connection on unmount
    };
  }, []);

  // Effect to send debounced markdown to WebSocket server
  useEffect(() => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(debouncedValue); // Send markdown to WebSocket server
      setLoading(true); // Show loading indicator while waiting for response
    }
  }, [debouncedValue]);

  // Save debounced markdown content when it changes
  useEffect(() => {
    if (activeFile && debouncedValue !== content) {
      saveFile(activeFile, debouncedValue); // Save to parent state only if the content changed
    }
  }, [debouncedValue, activeFile, content, saveFile]);

  const handleInputChange = (e) => {
    setMarkdown(e.target.value); // Update markdown text state on input change
  };

  const styles = {
    container: {
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
      backgroundColor: "#1e1e1e",
      color: "#dcdcdc",
      fontFamily: "Consolas, 'Courier New', monospace",
    },
    textarea: {
      width: isSidePanelOpen ? "50%" : "100%",
      height: "90vh",
      fontSize: "16px",
      padding: "15px",
      border: "none",
      outline: "none",
      borderRadius: "4px",
      resize: "none",
      backgroundColor: "#252526",
      color: "#dcdcdc",
      boxShadow: "inset 0 0 10px rgba(0,0,0,0.5)",
    },
    htmlOutput: {
      width: isSidePanelOpen ? "50%" : "100%",
      height: "90vh",
      overflowY: "auto",
      padding: "15px",
      backgroundColor: "#1e1e1e",
      borderLeft: "1px solid #333",
      color: "#dcdcdc",
      fontSize: "16px",
    },
    loading: {
      color: "#888",
      fontStyle: "italic",
    },
  };

  return (
    <div style={styles.container}>
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
          <p style={styles.loading}>Converting...</p>
        ) : (
          <MarkdownHTMLPreview htmlOutput={htmlOutput} />
        )}
      </div>
    </div>
  );
};

export default MainSection;
