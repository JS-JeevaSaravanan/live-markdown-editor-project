import { useState, useEffect, useRef } from "react";
import { useDebounce } from "../hooks/useDebounce";
import MarkdownHTMLPreview from "./MarkdownHTMLPreview";

const MainSection = ({ activeFile, content, saveFile, isSidePanelOpen, footerHeight = 50 }) => {
  const [markdown, setMarkdown] = useState(content || "");
  const [htmlOutput, setHtmlOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [socketStatus, setSocketStatus] = useState("disconnected");

  const { debouncedValue, setDebouncedValue } = useDebounce(markdown, 50);
  const socketRef = useRef(null);

  useEffect(() => {
    const newContent = content || "";
    setMarkdown(newContent);
    if (newContent !== debouncedValue) {
      setDebouncedValue(newContent);
    }
  }, [content]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:5002");
    socketRef.current = socket;

    socket.onopen = () => {
      setSocketStatus("connected");
    };

    socket.onmessage = (event) => {
      setHtmlOutput(event.data);
      setLoading(false);
    };

    socket.onerror = () => {
      setSocketStatus("error");
    };

    socket.onclose = () => {
      setSocketStatus("disconnected");
    };

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(debouncedValue);
      setLoading(true);
    }
  }, [debouncedValue]);

  useEffect(() => {
    if (activeFile && debouncedValue !== content) {
      saveFile(activeFile, debouncedValue);
    }
  }, [debouncedValue, saveFile]);

  const handleInputChange = (e) => {
    setMarkdown(e.target.value);
  };

  const styles = {
    container: {
      display: "flex",
      width: "100%",
      backgroundColor: "#1e1e1e", // Dark background
      color: "#dcdcdc", // Light text color
      fontFamily: "Consolas, 'Courier New', monospace",
      marginLeft: isSidePanelOpen ? "270px" : "0", // Offset by side panel width when open
      transition: "margin-left 0.3s ease", // Smooth transition
      padding: "20px",
      height: `calc(100vh - ${footerHeight}px)`, // Adjust height to not overflow footer
      overflow: "hidden", // Prevent body scroll
    },
    textarea: {
      flex: 1, // Let the textarea take up available space
      height: "80vh",// Ensure full height without overflowing
      fontSize: "16px",
      padding: "20px 15px", // Top and bottom padding added, left-right padding remains 15px
      border: "none",
      outline: "none",
      borderRadius: "4px",
      resize: "none",
      backgroundColor: "#252526", // Dark background for editor
      color: "#dcdcdc",
      boxShadow: "inset 0 0 10px rgba(0,0,0,0.5)",
      transition: "width 0.3s ease", // Smooth transition when side panel opens
      overflowY: "auto", // Make textarea scrollable if content exceeds height
    },
    htmlOutput: {
      flex: 1, // Let the output area take up available space
      height: "80vh", // Ensure full height without overflowing
      overflowY: "auto", // Make output scrollable when content exceeds height
      padding: "20px", // Padding applied consistently here
      backgroundColor: "#1e1e1e", // Dark background for preview
      borderLeft: "1px solid #333", // Divider between editor and preview
      color: "#dcdcdc",
      fontSize: "16px",
      boxShadow: "inset 0 0 10px rgba(0,0,0,0.5)",
      transition: "width 0.3s ease", // Smooth transition when side panel opens
    },
    loading: {
      color: "#888",
      fontStyle: "italic",
    },
    socketStatus: {
      color: socketStatus === "connected" ? "#4caf50" : "#f44336",
      fontWeight: "bold",
      marginTop: "10px",
    },
  };

  return (
    <div style={styles.container}>
      {/* Textarea editor */}
      {!isSidePanelOpen && (
        <textarea
          style={styles.textarea}
          value={markdown}
          onChange={handleInputChange}
          placeholder="Type Markdown here..."
        />
      )}

      {/* HTML output preview */}
      <div style={styles.htmlOutput}>
        {loading ? (
          <p style={styles.loading}>Converting...</p>
        ) : (
          <MarkdownHTMLPreview htmlOutput={htmlOutput} />
        )}
        {socketStatus !== "connected" && (
          <p style={styles.socketStatus}>
            {socketStatus === "disconnected"
              ? "Socket Connection Failed. Refresh Page!"
              : `Socket Status: ${socketStatus}`}
          </p>
        )}
      </div>
    </div>
  );
};

export default MainSection;
