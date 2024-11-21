import { jsPDF } from "jspdf";

// Utility function to load files from localStorage
export const loadFilesFromStorage = () => {
  const storedFiles = localStorage.getItem("markdownFiles");
  return storedFiles ? JSON.parse(storedFiles) : {};
};

// Utility function to save files to localStorage
export const saveFilesToStorage = (files) => {
  localStorage.setItem("markdownFiles", JSON.stringify(files));
};

// Utility function to create a unique file name
export const generateUniqueFileName = (baseFileName, existingFiles) => {
  let fileName = baseFileName;
  let counter = 1;
  while (existingFiles[fileName]) {
    fileName = `${baseFileName} (${counter++})`;
  }
  return fileName;
};

// Utility function to handle file import
export const handleFileImport = (file, files, createFile, saveFile) => {
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

    const uniqueFileName = generateUniqueFileName(baseFileName, files); // Ensure unique file name
    createFile(uniqueFileName); // Create the file
    saveFile(uniqueFileName, content); // Save the file content
  };

  reader.onerror = () => {
    alert("Failed to read the file. Please try again.");
  };

  reader.readAsText(file, "utf-8");
};

// Utility function to handle file export
export const handleFileExport = (activeFile, files, format) => {
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

// Utility function to preview the export
export const previewExport = (activeFile, files, format) => {
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
