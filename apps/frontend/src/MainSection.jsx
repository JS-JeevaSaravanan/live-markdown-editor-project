import React from "react";

const MainSection = ({ markdown, htmlOutput, loading, handleInputChange, isSidePanelOpen }) => {
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
    <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
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
