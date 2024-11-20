import { useState, useEffect, useRef } from "react";
import { useDebounce } from "./customHooks"; // Custom hook for debouncing input

const MainSection = ({ isSidePanelOpen }) => {
  const [markdown, setMarkdown] = useState(""); // State for markdown input
  const [htmlOutput, setHtmlOutput] = useState(""); // State for the HTML output
  const [loading, setLoading] = useState(false); // State to show loading indicator
  const [socketStatus, setSocketStatus] = useState("disconnected"); // WebSocket status

  const debouncedValue = useDebounce(markdown, 100); // Debounced markdown value
  const socketRef = useRef(null); // Ref to hold WebSocket instance

  // WebSocket connection logic
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:5002"); // Connect to WebSocket server
    socketRef.current = socket;

    socket.onopen = () => {
      setSocketStatus("connected");
      console.log("WebSocket connection established");
    };

    socket.onmessage = (event) => {
      // console.log("Received from WebSocket:", event.data);
      setHtmlOutput(event.data); // Set the HTML output
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
      socket.close(); // Cleanup WebSocket on unmount
    };
  }, []);

  // Send markdown to WebSocket server
  const sendMarkdownToServer = (markdownText) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(markdownText); // Send to WebSocket server
      setLoading(true); // Show loading indicator while waiting for response
    } else {
      console.error("WebSocket is not connected");
      setLoading(false);
    }
  };

  // Effect to send debounced markdown to WebSocket server
  useEffect(() => {
    sendMarkdownToServer(debouncedValue); // Send the debounced value
  }, [debouncedValue]);

  const handleInputChange = (e) => {
    setMarkdown(e.target.value); // Update markdown text state on input change
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
