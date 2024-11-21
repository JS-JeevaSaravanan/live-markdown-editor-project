import { useState, useCallback } from "react";
import Header from "./components/Header";
import SidePanel from "./components/SidePanel";
import MainSection from "./components/MainSection";
import Footer from "./components/Footer";
import { jsPDF } from "jspdf";

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

  // Handle file import
  const importFileContent = (file) => {
    if (!file) {
      alert("No file selected.");
      return;
    }

    const allowedExtensions = [".md", ".html"];
    const fileExtension = file.name
      .slice(file.name.lastIndexOf("."))
      .toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      alert(
        "Unsupported file type. Please select a Markdown (.md) or HTML (.html) file."
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      let baseFileName = file.name.replace(/\.[^/.]+$/, ""); // Strip file extension

      // Ensure unique file name
      let fileName = baseFileName;
      let counter = 1;
      while (files[fileName]) {
        fileName = `${baseFileName} (${counter++})`;
      }

      createFile(fileName); // Create the file
      saveFile(fileName, content); // Save the file content
    };

    reader.onerror = () => {
      alert("Failed to read the file. Please try again.");
    };

    reader.readAsText(file, "utf-8");
  };

  // Handle file export
  const exportFile = (format) => {
    if (!activeFile) {
      alert("No active file selected.");
      return;
    }

    const content = files[activeFile];
    let blob;
    let fileExtension;

    switch (format) {
      case "markdown":
        blob = new Blob([content], { type: "text/markdown" });
        fileExtension = "md";
        break;
      case "html":
        blob = new Blob([content], { type: "text/html" });
        fileExtension = "html";
        break;
      case "styled html":
        const styledContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>body { font-family: Arial, sans-serif; padding: 20px; }</style>
        </head>
        <body>
          ${content}
        </body>
        </html>`;
        blob = new Blob([styledContent], { type: "text/html" });
        fileExtension = "html";
        break;
      case "pdf":
        // Using jsPDF for PDF export (you need to install jsPDF first)

        const doc = new jsPDF();
        doc.text(content, 10, 10); // Basic example, improve as needed
        doc.save(`${activeFile}.pdf`);
        return;
      default:
        alert("Unsupported export format.");
        return;
    }

    // Trigger file download
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${activeFile}.${fileExtension}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Preview export
  const previewExport = (format) => {
    if (!activeFile) {
      alert("No active file selected.");
      return;
    }

    const content = files[activeFile];
    const previewWindow = window.open("", "_blank");

    switch (format) {
      case "markdown":
        previewWindow.document.write(
          `<html><body><pre style="white-space: pre-wrap; font-family: Consolas, 'Courier New', monospace;">${content}</pre></body></html>`
        );
        break;
      case "html":
        previewWindow.document.write(`<html><body>${content}</body></html>`);
        break;
      case "styled html":
        const styledContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <style>body { font-family: Arial, sans-serif; padding: 20px; }</style>
          </head>
          <body>
            ${content}
          </body>
          </html>`;
        previewWindow.document.write(styledContent);
        break;
      case "pdf":
        // Generate PDF using jsPDF
        const doc = new jsPDF();
        doc.text(content, 10, 10); // Add content at position (10, 10)

        // Create a Blob URL from the PDF content
        const pdfBlob = doc.output("blob");
        const pdfUrl = URL.createObjectURL(pdfBlob);

        // Embed the PDF in an iframe for preview
        previewWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>PDF Preview</title>
          </head>
          <body>
            <h1>PDF Preview</h1>
            <iframe src="${pdfUrl}" width="100%" height="100%" style="border: none;"></iframe>
          </body>
          </html>
        `);
        break;
      default:
        previewWindow.document.write(
          `<html><body><p>Unsupported preview format.</p></body></html>`
        );
    }

    previewWindow.document.close();
  };

  return (
    <div style={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      <Header
        toggleSidePanel={toggleSidePanel}
        isSidePanelOpen={isSidePanelOpen}
        importFileContent={importFileContent}
        exportFile={exportFile}
        previewExport={previewExport}
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
