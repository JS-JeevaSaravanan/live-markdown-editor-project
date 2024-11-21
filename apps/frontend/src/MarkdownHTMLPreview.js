import { useEffect, useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

// Component for rendering markdown HTML preview
const MarkdownHTMLPreview = ({ htmlOutput }) => {
  const [renderedOutput, setRenderedOutput] = useState([]);

  useEffect(() => {
    const processHtmlOutput = () => {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = htmlOutput;
      const elements = Array.from(tempDiv.childNodes).map((node, index) =>
        handleNode(node, index)
      );

      setRenderedOutput(elements);
    };

    processHtmlOutput();
  }, [htmlOutput]);

  // Helper function to handle different node types
  const handleNode = (node, index) => {
    switch (node.tagName) {
      case "PRE":
        return handleCodeBlock(node, index);
      case "BLOCKQUOTE":
        return handleBlockquote(node, index);
      case "H1":
      case "H2":
      case "H3":
      case "H4":
      case "H5":
      case "H6":
        return handleHeading(node, index);
      case "UL":
      case "OL":
        return handleList(node, index);
      case "LI":
        return handleListItem(node, index);
      case "IMG":
        return handleImage(node, index);
      case "A":
        return handleLink(node, index);
      case "TABLE":
        return handleTable(node, index);
      case "HR":
        return handleHorizontalRule(index);
      case "P":
        return handleParagraph(node, index);
      default:
        return handleDefaultNode(node, index);
    }
  };

  // Render a code block
  const handleCodeBlock = (node, index) => {
    const codeBlock = node.querySelector("code");
    const language =
      (codeBlock.className || "").replace("language-", "") || "plaintext";
    const code = codeBlock.textContent;

    return (
      <SyntaxHighlighter
        key={index}
        language={language}
        style={atomOneDark}
        showLineNumbers
        wrapLines
      >
        {code}
      </SyntaxHighlighter>
    );
  };

  // Render blockquote
  const handleBlockquote = (node, index) => (
    <blockquote key={index} style={styles.blockquote}>
      {node.textContent}
    </blockquote>
  );

  // Render headings (H1-H6)
  const handleHeading = (node, index) => {
    const level = parseInt(node.tagName.replace("H", ""), 10);
    return (
      <div
        key={index}
        style={{ ...styles.heading, fontSize: `${1.2 + (6 - level) * 0.2}em` }}
      >
        {node.textContent}
      </div>
    );
  };

  // Render list (UL/OL)
  const handleList = (node, index) => (
    <div
      key={index}
      dangerouslySetInnerHTML={{ __html: node.outerHTML }}
      style={styles.list}
    />
  );

  // Render list item (LI)
  const handleListItem = (node, index) => (
    <li key={index} style={styles.listItem}>
      {node.textContent}
    </li>
  );

  // Render image
  const handleImage = (node, index) => (
    <img key={index} src={node.src} alt={node.alt || ""} style={styles.image} />
  );

  // Render link
  const handleLink = (node, index) => (
    <a key={index} href={node.href} style={styles.link}>
      {node.textContent}
    </a>
  );

  // Render table
  const handleTable = (node, index) => (
    <table key={index} style={styles.table}>
      {Array.from(node.children).map((child, childIndex) =>
        renderTableChild(child, childIndex)
      )}
    </table>
  );

  // Render table header and body
  const renderTableChild = (child, childIndex) => {
    if (child.tagName === "THEAD") {
      return (
        <thead key={childIndex} style={styles.tableHeaderRow}>
          {Array.from(child.children).map((row, rowIndex) =>
            renderTableRow(row, rowIndex, "th")
          )}
        </thead>
      );
    }
    if (child.tagName === "TBODY") {
      return (
        <tbody key={childIndex}>
          {Array.from(child.children).map((row, rowIndex) =>
            renderTableRow(row, rowIndex, "td")
          )}
        </tbody>
      );
    }
    return null;
  };

  // Render table rows
  const renderTableRow = (row, rowIndex, cellType) => (
    <tr key={rowIndex} style={styles.tableRow}>
      {Array.from(row.children).map((cell, cellIndex) => {
        if (cell.tagName === (cellType === "th" ? "TH" : "TD")) {
          return (
            <cellType
              key={cellIndex}
              style={cellType === "th" ? styles.tableHeader : styles.tableData}
            >
              {cell.textContent}
            </cellType>
          );
        }
        return null;
      })}
    </tr>
  );

  // Render horizontal rule (HR)
  const handleHorizontalRule = (index) => <hr key={index} style={styles.hr} />;

  // Render paragraph
  const handleParagraph = (node, index) => (
    <p key={index} style={styles.paragraph}>
      {node.textContent}
    </p>
  );

  // Render default node
  const handleDefaultNode = (node, index) => (
    <div
      key={index}
      dangerouslySetInnerHTML={{ __html: node.outerHTML }}
      style={styles.default}
    />
  );

  const styles = {
    container: {
      backgroundColor: "#2e2e2e",
      color: "#dcdcdc",
      padding: "16px",
      borderRadius: "8px",
      overflow: "auto",
      fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif",
      lineHeight: "1.6",
    },
    heading: { margin: "1em 0", fontWeight: "bold", color: "#e8e8e8" },
    paragraph: { marginBottom: "1em", fontSize: "1em", color: "#dcdcdc" },
    blockquote: {
      borderLeft: "4px solid #6a9fb5",
      paddingLeft: "16px",
      margin: "1em 0",
      color: "#a9b7c6",
      fontStyle: "italic",
    },
    list: { marginLeft: "1.5em", marginBottom: "1em", color: "#dcdcdc" },
    listItem: { marginBottom: "0.5em" },
    image: { maxWidth: "100%", height: "auto", borderRadius: "4px" },
    link: { color: "#79aaff", textDecoration: "none" },
    table: { width: "100%", borderCollapse: "collapse", marginBottom: "1em" },
    tableRow: { borderBottom: "1px solid #444" },
    tableHeaderRow: { backgroundColor: "#444" },
    tableHeader: { padding: "8px", color: "#fff", fontWeight: "bold" },
    tableData: { padding: "8px", backgroundColor: "#333", color: "#fff" },
    hr: { borderTop: "1px solid #444", margin: "1em 0" },
    default: { marginBottom: "1em" },
  };

  return <div style={styles.container}>{renderedOutput}</div>;
};

export default MarkdownHTMLPreview;
