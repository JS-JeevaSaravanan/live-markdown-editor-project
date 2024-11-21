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
      position: "relative", // for the dropdown menu
    },
    headerTitle: {
      fontSize: "20px",
      margin: 0,
      fontWeight: "bold",
      flex: 1, // Makes the title take up available space on the left
    },
    controls: {
      display: "flex",
      gap: "15px",
      alignItems: "center",
      justifyContent: "flex-end", // Aligns the buttons to the right
    },
    fileInput: {
      display: "none",
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
    dropdownMenu: {
      position: "absolute",
      top: "50px",
      right: "20px",
      backgroundColor: "#1e1e1e",
      color: "#f5f5f5",
      border: "1px solid #333",
      borderRadius: "4px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
      zIndex: 1000,
      width: "150px",
      display: isExportMenuOpen ? "block" : "none",
    },
    dropdownItem: {
      padding: "10px 15px",
      cursor: "pointer",
      fontFamily: "Consolas, 'Courier New', monospace",
      fontSize: "14px",
      borderBottom: "1px solid #333",
      transition: "background-color 0.2s ease",
    },
    dropdownItemHover: {
      backgroundColor: "#333",
    },
    hamburgerButton: {
      fontSize: "20px",
      backgroundColor: "transparent",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      padding: "0",
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
    setIsExportMenuOpen(false); // Close the export menu after selection
  };

  return (
    <header style={styles.header}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* Hamburger Menu Button */}
        <button style={styles.hamburgerButton} onClick={toggleSidePanel}>
          ☰
        </button>
        {/* Markdown Editor Title */}
        <h1 style={styles.headerTitle}> Markdown Editor 📄</h1>
      </div>

      <div style={styles.controls}>
        {/* Import Button */}
        <label htmlFor="file-input" style={styles.toggleButton}>
          Import
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

        {/* Export Dropdown Button */}
        <button
          style={styles.toggleButton}
          onClick={() => setIsExportMenuOpen((prev) => !prev)}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          Export
        </button>

        {/* Export Menu (Dropdown) */}
        <div style={styles.dropdownMenu}>
          {["Markdown", "HTML", "Styled HTML", "PDF"].map((format) => (
            <div
              key={format}
              style={styles.dropdownItem}
              onClick={() => handleExport(format.toLowerCase())}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor =
                  styles.dropdownItemHover.backgroundColor)
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
      </div>
    </header>
  );
};

export default Header;
