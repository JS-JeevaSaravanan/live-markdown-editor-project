import { useState, useEffect, useCallback } from "react";
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

  // Set the first file as active on mount or create a new one
  useEffect(() => {
    if (Object.keys(files).length === 0) {
      // No files, create the first one
      const newFileName = "File 1";
      const updatedFiles = { [newFileName]: "" };
      setFiles(updatedFiles);
      saveFilesToStorage(updatedFiles);
      setActiveFile(newFileName); // Set newly created file as active
    } else {
      // If files exist, set the first one as active
      const firstFile = Object.keys(files)[0];
      setActiveFile(firstFile);
    }
  }, [files]);

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        margin: 0,
        overflow: "hidden",
      }}
    >
      <Header
        activeFile={activeFile}
        toggleSidePanel={toggleSidePanel}
        importFileContent={importFileContent}
        exportFile={exportFile}
        previewExport={previewExportHandler}
      />
      <div
        style={{
          display: "flex",
          flex: 1,
          overflow: "hidden",
        }}
      >
        <SidePanel
          isOpen={isSidePanelOpen}
          files={files}
          activeFile={activeFile}
          setActiveFile={setActiveFile}
          createFile={createFile}
          deleteFile={deleteFile}
          renameFile={renameFile}
          toggleSidePanel={toggleSidePanel}
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
