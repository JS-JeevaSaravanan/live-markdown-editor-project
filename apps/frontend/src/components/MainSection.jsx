import { useState, useEffect, useRef } from "react";
import { useDebounce } from "../hooks/useDebounce";
import MarkdownHTMLPreview from "./MarkdownHTMLPreview";

const MainSection = ({
  activeFile,
  content,
  saveFile,
  isSidePanelOpen,
  footerHeight = 50,
}) => {
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
      backgroundColor: "#1e1e1e",
      color: "#dcdcdc",
      fontFamily: "Consolas, 'Courier New', monospace",
      marginLeft: isSidePanelOpen ? "270px" : "0",
      transition: "margin-left 0.3s ease",
      padding: "20px",
      height: `calc(100vh - ${footerHeight}px)`,
      overflow: "hidden",
    },
    textarea: {
      flex: 1,
      height: "80vh",
      fontSize: "16px",
      padding: "20px 15px",
      border: "none",
      outline: "none",
      borderRadius: "4px",
      resize: "none",
      backgroundColor: "#252526",
      color: "#dcdcdc",
      boxShadow: "inset 0 0 10px rgba(0,0,0,0.5)",
      transition: "width 0.3s ease",
      overflowY: "auto",
    },
    htmlOutput: {
      flex: 1,
      height: "80vh",
      overflowY: "auto",
      padding: "20px",
      backgroundColor: "#1e1e1e",
      borderLeft: "1px solid #333",
      color: "#dcdcdc",
      fontSize: "16px",
      boxShadow: "inset 0 0 10px rgba(0,0,0,0.5)",
      transition: "width 0.3s ease",
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
      {!isSidePanelOpen && (
        <textarea
          style={styles.textarea}
          value={markdown}
          onChange={handleInputChange}
          placeholder="Type Markdown here..."
        />
      )}
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
