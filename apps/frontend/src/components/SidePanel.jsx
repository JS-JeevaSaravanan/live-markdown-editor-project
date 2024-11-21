import { useState } from "react";

const SidePanel = ({
  isOpen,
  files,
  activeFile,
  setActiveFile,
  createFile,
  deleteFile,
  renameFile,
  toggleSidePanel,
}) => {
  const [newFileName, setNewFileName] = useState("");
  const [renamingFile, setRenamingFile] = useState(null);
  const [newFileNameForRename, setNewFileNameForRename] = useState("");

  const styles = {
    sidePanel: {
      width: "250px",
      backgroundColor: "#1e1e1e",
      color: "#f5f5f5",
      borderRight: "1px solid #333",
      padding: "20px",
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      transition: "transform 0.2.5s ease-in-out",
      transform: isOpen ? "translateX(0)" : "translateX(-100%)",
      fontFamily: "Consolas, 'Courier New', monospace",
      overflowY: "auto",
      maxHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    },
    fileList: {
      overflowY: "auto",
      flex: 1,
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
      wordBreak: "break-word",
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
      boxSizing: "border-box",
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
      transition: "color 0.2s ease",
    },
    iconButtonHover: {
      color: "#007acc",
    },
    closeButton: {
      position: "absolute",
      top: "20px",
      right: "20px",
      background: "transparent",
      border: "none",
      color: "#fff",
      fontSize: "20px",
      cursor: "pointer",
    },
    hamburgerButton: {
      fontSize: "30px",
      color: "#fff",
      background: "transparent",
      border: "none",
      cursor: "pointer",
      position: "absolute",
      top: "20px",
      left: "20px",
    },
    fileActions: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    noFiles: {
      color: "#b3b3b3",
      fontStyle: "italic",
    },
    createFileSection: {
      marginTop: "auto",
    },
    disabledButton: {
      backgroundColor: "#555",
      cursor: "not-allowed",
    },
    tooltip: {
      position: "absolute",
      top: "0",
      left: "100%",
      backgroundColor: "#333",
      color: "#fff",
      padding: "5px",
      borderRadius: "4px",
      fontSize: "12px",
      marginLeft: "10px",
      whiteSpace: "nowrap",
    },
  };

  const isFileNameTaken = (name) => {
    return Object.keys(files).includes(name.trim());
  };

  const handleCreateFile = () => {
    if (newFileName.trim()) {
      createFile(newFileName.trim());
      setNewFileName("");
    }
  };

  const handleRenameFile = () => {
    if (
      renamingFile &&
      newFileNameForRename.trim() &&
      !isFileNameTaken(newFileNameForRename)
    ) {
      renameFile(renamingFile, newFileNameForRename.trim());
      setRenamingFile(null);
      setNewFileNameForRename("");
    }
  };

  const isDeleteDisabled = Object.keys(files).length <= 1;

  return (
    <div style={styles.sidePanel}>
      <button style={styles.closeButton} onClick={toggleSidePanel}>
        ×
      </button>

      <h3 style={{ borderBottom: "1px solid #34495e", paddingBottom: "10px" }}>
        📂 Files
      </h3>
      <div style={styles.fileList}>
        {Object.keys(files).length === 0 ? (
          <p style={styles.noFiles}>No files available.</p>
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
                <span
                  style={{
                    flexGrow: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {fileName}
                </span>
              )}
              <div style={styles.fileActions}>
                {renamingFile !== fileName && (
                  <button
                    style={{ ...styles.iconButton, ...styles.iconButtonHover }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setRenamingFile(fileName);
                      setNewFileNameForRename(fileName);
                    }}
                    title="Rename File"
                  >
                    ✏️
                  </button>
                )}
                {!isDeleteDisabled && (
                  <button
                    style={{
                      ...styles.iconButton,
                      color: "#e81123",
                      ...styles.iconButtonHover,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteFile(fileName);
                    }}
                    title="Delete File"
                  >
                    🗑️
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      <div style={{ ...styles.createFileSection, ...styles.controls }}>
        <input
          type="text"
          placeholder="New File Name"
          value={newFileName}
          onChange={(e) => setNewFileName(e.target.value)}
          style={styles.input}
        />
        <button
          style={{
            ...styles.button,
            ...(isFileNameTaken(newFileName) && styles.disabledButton),
          }}
          onClick={handleCreateFile}
          disabled={isFileNameTaken(newFileName)}
          title={isFileNameTaken(newFileName) ? "File name already exists" : ""}
        >
          Create New File
        </button>
      </div>
    </div>
  );
};

export default SidePanel;
