import { useState } from "react";

const SidePanel = ({
  isOpen,
  files,
  activeFile,
  setActiveFile,
  createFile,
  deleteFile,
  renameFile,
}) => {
  const [newFileName, setNewFileName] = useState("");
  const [renamingFile, setRenamingFile] = useState(null); // File being renamed
  const [newFileNameForRename, setNewFileNameForRename] = useState("");

  const styles = {
    sidePanel: {
      width: "300px",
      backgroundColor: "#1e1e1e",
      color: "#f5f5f5",
      borderRight: "1px solid #333",
      padding: "20px",
      position: "absolute",
      top: "50px",
      left: 0,
      bottom: 0,
      transition: "transform 0.3s ease-in-out",
      transform: isOpen ? "translateX(0)" : "translateX(-100%)",
      fontFamily: "Consolas, 'Courier New', monospace",
      overflowY: "auto",
    },
    fileItem: {
      padding: "8px 12px",
      cursor: "pointer",
      backgroundColor: "#2a2a2a",
      marginBottom: "8px",
      borderRadius: "4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      transition: "background-color 0.3s ease",
    },
    activeFile: {
      backgroundColor: "#007acc",
      color: "#fff",
    },
    controls: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      marginTop: "20px",
    },
    input: {
      width: "100%",
      padding: "10px",
      borderRadius: "4px",
      border: "1px solid #555",
      backgroundColor: "#2a2a2a",
      color: "#f5f5f5",
      fontSize: "14px",
    },
    button: {
      padding: "8px 12px",
      backgroundColor: "#007acc",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "bold",
      transition: "background-color 0.3s ease",
    },
    buttonDelete: {
      backgroundColor: "#e81123",
    },
    iconButton: {
      background: "transparent",
      border: "none",
      color: "#fff",
      cursor: "pointer",
      fontSize: "16px",
      marginLeft: "10px",
    },
  };

  const handleCreateFile = () => {
    if (newFileName.trim()) {
      createFile(newFileName.trim());
      setNewFileName("");
    }
  };

  const handleRenameFile = () => {
    if (renamingFile && newFileNameForRename.trim()) {
      renameFile(renamingFile, newFileNameForRename.trim());
      setRenamingFile(null);
      setNewFileNameForRename("");
    }
  };

  return (
    <div style={styles.sidePanel}>
      <h3 style={{ borderBottom: "1px solid #333", paddingBottom: "10px" }}>
        📂 Markdown Files
      </h3>
      <div>
        {Object.keys(files).length === 0 ? (
          <p>No files available.</p>
        ) : (
          Object.keys(files).map((fileName) => (
            <div
              key={fileName}
              style={{
                ...styles.fileItem,
                ...(fileName === activeFile ? styles.activeFile : {}),
              }}
              onClick={() => setActiveFile(fileName)}
            >
              {renamingFile === fileName ? (
                <input
                  type="text"
                  value={newFileNameForRename}
                  onChange={(e) => setNewFileNameForRename(e.target.value)}
                  onBlur={handleRenameFile}
                  autoFocus
                  style={styles.input}
                />
              ) : (
                <span style={{ flexGrow: 1 }}>{fileName}</span>
              )}
              <button
                style={styles.iconButton}
                onClick={(e) => {
                  e.stopPropagation();
                  setRenamingFile(fileName);
                  setNewFileNameForRename(fileName);
                }}
                title="Rename File"
              >
                ✏️
              </button>
              <button
                style={{ ...styles.iconButton, color: "#e81123" }}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteFile(fileName);
                }}
                title="Delete File"
              >
                ❌
              </button>
            </div>
          ))
        )}
      </div>
      <div style={styles.controls}>
        <input
          type="text"
          placeholder="New File Name"
          value={newFileName}
          onChange={(e) => setNewFileName(e.target.value)}
          style={styles.input}
        />
        <button style={styles.button} onClick={handleCreateFile}>
          Create New File
        </button>
      </div>
    </div>
  );
};

export default SidePanel;
