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
} from "./utils";

const App = () => {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [activeFile, setActiveFile] = useState(null);
  const [files, setFiles] = useState(() => loadFilesFromStorage());

  const createFile = (fileName = "File 1", content = "") => {
    if (!fileName || files[fileName]) {
      alert("File name must be unique and not empty.");
      return;
    }
    const updatedFiles = { ...files, [fileName]: content };
    setFiles(saveFilesToStorage(updatedFiles));
    setActiveFile(fileName);
  };

  useEffect(() => {
    if (Object.keys(files).length === 0) {
      createFile();
    } else {
      const firstFile = Object.keys(files)[0];
      setActiveFile(firstFile);
    }
  }, []);

  const toggleSidePanel = () => {
    setIsSidePanelOpen((prev) => !prev);
  };

  const saveFile = useCallback((fileName, content) => {
    setFiles((prevFiles) => {
      const updatedFiles = { ...prevFiles, [fileName]: content };
      return saveFilesToStorage(updatedFiles);
    });
  }, []);

  const deleteFile = (fileName) => {
    const { [fileName]: _, ...rest } = files;
    setFiles(saveFilesToStorage(rest));
    if (activeFile === fileName)
      setActiveFile(files[Object.keys(rest)[0]] ? Object.keys(rest)[0] : null);
  };

  const renameFile = (oldName, newName) => {
    if (!newName || files[newName]) {
      alert("New file name must be unique and not empty.");
      return;
    }
    const { [oldName]: content, ...rest } = files;
    const updatedFiles = { ...rest, [newName]: content };
    setFiles(saveFilesToStorage(updatedFiles));
    if (activeFile === oldName) setActiveFile(newName);
  };

  const importFileContent = (file) => {
    handleFileImport(file, files, createFile, saveFile);
  };

  const exportFile = (format) => {
    handleFileExport(activeFile, files, format);
  };

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
