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
      width: "250px",
      backgroundColor: "#f4f4f4",
      borderRight: "1px solid #ddd",
      padding: "20px",
      position: "absolute",
      top: "50px",
      left: 0,
      bottom: 0,
      transition: "transform 0.3s ease-in-out",
      transform: isOpen ? "translateX(0)" : "translateX(-100%)",
    },
    fileItem: {
      padding: "10px",
      cursor: "pointer",
      backgroundColor: "#fff",
      marginBottom: "5px",
      borderRadius: "4px",
      border: "1px solid #ddd",
    },
    activeFile: {
      backgroundColor: "#d0e6ff",
    },
    controls: {
      display: "flex",
      gap: "10px",
      marginTop: "10px",
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
      <h3>Markdown Files</h3>
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
                />
              ) : (
                <span>{fileName}</span>
              )}
              <button
                style={{
                  marginLeft: "10px",
                  cursor: "pointer",
                  background: "transparent",
                  border: "none",
                  color: "blue",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setRenamingFile(fileName);
                  setNewFileNameForRename(fileName);
                }}
              >
                ✏️
              </button>
              <button
                style={{
                  marginLeft: "5px",
                  cursor: "pointer",
                  background: "transparent",
                  border: "none",
                  color: "red",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteFile(fileName);
                }}
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
        />
        <button onClick={handleCreateFile}>Create</button>
      </div>
    </div>
  );
};

export default SidePanel;
