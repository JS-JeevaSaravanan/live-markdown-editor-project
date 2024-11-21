import { useState, useCallback } from "react";
import Header from "./components/Header";
import SidePanel from "./components/SidePanel";
import MainSection from "./components/MainSection";
import Footer from "./components/Footer";
import {
  loadFilesFromStorage,
  saveFilesToStorage,
  handleFileImport,
  handleFileExport,
  previewExport,
  generateUniqueFileName,
} from "./utils"; // Import the utilities

const App = () => {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false); // Default: sidebar is closed
  const [activeFile, setActiveFile] = useState(null);
  const [files, setFiles] = useState(() => loadFilesFromStorage()); // Use utility to load files from localStorage

  const toggleSidePanel = () => {
    setIsSidePanelOpen((prev) => !prev);
  };

  const saveFile = useCallback((fileName, content) => {
    setFiles((prevFiles) => {
      const updatedFiles = { ...prevFiles, [fileName]: content };
      saveFilesToStorage(updatedFiles); // Save files to localStorage
      return updatedFiles;
    });
  }, []);

  const deleteFile = (fileName) => {
    const { [fileName]: _, ...rest } = files;
    setFiles(rest);
    saveFilesToStorage(rest); // Save updated files to localStorage
    if (activeFile === fileName) setActiveFile(null);
  };

  const createFile = (fileName) => {
    if (!fileName || files[fileName]) {
      alert("File name must be unique and not empty.");
      return;
    }
    const updatedFiles = { ...files, [fileName]: "" };
    setFiles(updatedFiles);
    saveFilesToStorage(updatedFiles);
    setActiveFile(fileName);
  };

  const renameFile = (oldName, newName) => {
    if (!newName || files[newName]) {
      alert("New file name must be unique and not empty.");
      return;
    }
    const { [oldName]: content, ...rest } = files;
    const updatedFiles = { ...rest, [newName]: content };
    setFiles(updatedFiles);
    saveFilesToStorage(updatedFiles);
    if (activeFile === oldName) setActiveFile(newName);
  };

  // Handle file import using utility
  const importFileContent = (file) => {
    handleFileImport(file, files, createFile, saveFile);
  };

  // Handle file export using utility
  const exportFile = (format) => {
    handleFileExport(activeFile, files, format);
  };

  // Preview export using utility
  const previewExportHandler = (format) => {
    previewExport(activeFile, files, format);
  };

  return (
    <div style={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      <Header
        toggleSidePanel={toggleSidePanel}
        isSidePanelOpen={isSidePanelOpen}
        importFileContent={importFileContent}
        exportFile={exportFile}
        previewExport={previewExportHandler}
      />
      <div style={{ display: "flex", flex: 1 }}>
        <SidePanel
          isOpen={isSidePanelOpen}
          files={files}
          activeFile={activeFile}
          setActiveFile={setActiveFile}
          createFile={createFile}
          deleteFile={deleteFile}
          renameFile={renameFile}
          toggleSidePanel={toggleSidePanel} // Pass down toggle function
        />
        <MainSection
          activeFile={activeFile}
          content={files[activeFile] || ""}
          saveFile={saveFile}
          isSidePanelOpen={isSidePanelOpen}
        />
      </div>
      <Footer />
    </div>
  );
};

export default App;
