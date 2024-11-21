import { useState } from "react";

const Header = ({
  toggleSidePanel,
  isSidePanelOpen,
  importFileContent,
  exportFile,
  previewExport,
}) => {
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false); // Toggle export menu visibility

  const styles = {
    header: {
      backgroundColor: "#1e1e1e",
      color: "#f5f5f5",
      display: "flex",
      alignItems: "center",
      padding: "10px 20px",
      justifyContent: "space-between",
      fontFamily: "Consolas, 'Courier New', monospace",
      borderBottom: "1px solid #333",
    },
    toggleButton: {
      backgroundColor: "#007acc",
      color: "#fff",
      border: "none",
      padding: "8px 16px",
      cursor: "pointer",
      borderRadius: "4px",
      fontSize: "14px",
      fontWeight: "bold",
      transition: "background-color 0.3s ease",
    },
    toggleButtonHover: {
      backgroundColor: "#005f99",
    },
    headerTitle: {
      fontSize: "20px",
      margin: 0,
      fontWeight: "bold",
    },
    controls: {
      display: "flex",
      gap: "10px",
    },
    fileInput: {
      display: "none",
    },
    exportMenu: {
      position: "absolute",
      top: "50px",
      right: "20px",
      backgroundColor: "#1e1e1e",
      color: "#f5f5f5",
      border: "1px solid #333",
      borderRadius: "4px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
      zIndex: 1000,
    },
    exportMenuItem: {
      padding: "10px 15px",
      cursor: "pointer",
      fontFamily: "Consolas, 'Courier New', monospace",
      fontSize: "14px",
      borderBottom: "1px solid #333",
      transition: "background-color 0.2s ease",
    },
    exportMenuItemHover: {
      backgroundColor: "#333",
    },
  };

  const handleMouseOver = (e) => {
    e.target.style.backgroundColor = styles.toggleButtonHover.backgroundColor;
  };

  const handleMouseOut = (e) => {
    e.target.style.backgroundColor = styles.toggleButton.backgroundColor;
  };

  const handleExport = (format) => {
    exportFile(format); // Trigger the export action
    setIsExportMenuOpen(false);
  };

  return (
    <header style={styles.header}>
      <div style={styles.controls}>
        <button
          onClick={toggleSidePanel}
          style={styles.toggleButton}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          {isSidePanelOpen ? "Close Sidebar" : "Open Sidebar"}
        </button>

        {/* Import Button */}
        <label htmlFor="file-input" style={styles.toggleButton}>
          Import File
          <input
            id="file-input"
            type="file"
            accept=".md,.html"
            style={styles.fileInput}
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) importFileContent(file);
            }}
          />
        </label>

        {/* Export Button */}
        <button
          style={styles.toggleButton}
          onClick={() => setIsExportMenuOpen((prev) => !prev)}
        >
          Export
        </button>
      </div>

      <h1 style={styles.headerTitle}>📄 Markdown Editor</h1>

      {/* Export Menu */}
      {isExportMenuOpen && (
        <div style={styles.exportMenu}>
          {["Markdown", "HTML", "Styled HTML", "PDF"].map((format) => (
            <div
              key={format}
              style={styles.exportMenuItem}
              onClick={() => handleExport(format.toLowerCase())}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor =
                  styles.exportMenuItemHover.backgroundColor)
              }
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
            >
              {format}
              <button
                style={{
                  marginLeft: "10px",
                  cursor: "pointer",
                  background: "transparent",
                  border: "none",
                  color: "#007acc",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  previewExport(format.toLowerCase());
                }}
              >
                Preview
              </button>
            </div>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
