import { useState, useCallback } from "react";
import Header from "./Header";
import SidePanel from "./SidePanel";
import MainSection from "./MainSection";
import Footer from "./Footer";

const App = () => {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(true);
  const [activeFile, setActiveFile] = useState(null);
  const [files, setFiles] = useState(() => {
    const storedFiles = localStorage.getItem("markdownFiles");
    return storedFiles ? JSON.parse(storedFiles) : {};
  });

  const toggleSidePanel = () => {
    setIsSidePanelOpen((prev) => !prev);
  };

  const saveFile = useCallback((fileName, content) => {
    setFiles((prevFiles) => {
      const updatedFiles = { ...prevFiles, [fileName]: content };
      localStorage.setItem("markdownFiles", JSON.stringify(updatedFiles));
      return updatedFiles;
    });
  }, []);

  const deleteFile = (fileName) => {
    const { [fileName]: _, ...rest } = files;
    setFiles(rest);
    localStorage.setItem("markdownFiles", JSON.stringify(rest));
    if (activeFile === fileName) setActiveFile(null);
  };

  const createFile = (fileName) => {
    if (!fileName || files[fileName]) {
      alert("File name must be unique and not empty.");
      return;
    }
    const updatedFiles = { ...files, [fileName]: "" };
    setFiles(updatedFiles);
    localStorage.setItem("markdownFiles", JSON.stringify(updatedFiles));
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
    localStorage.setItem("markdownFiles", JSON.stringify(updatedFiles));
    if (activeFile === oldName) setActiveFile(newName);
  };

  return (
    <div style={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      <Header
        toggleSidePanel={toggleSidePanel}
        isSidePanelOpen={isSidePanelOpen}
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
