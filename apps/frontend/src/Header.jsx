const Header = ({ toggleSidePanel, isSidePanelOpen }) => {
  const styles = {
    header: {
      backgroundColor: "#1e1e1e",
      color: "#f5f5f5",
      display: "flex",
      alignItems: "center",
      padding: "10px 20px",
      justifyContent: "space-between",
      fontFamily: "Consolas, 'Courier New', monospace",
      borderBottom: "1px solid #333",
    },
    toggleButton: {
      backgroundColor: "#007acc",
      color: "#fff",
      border: "none",
      padding: "8px 16px",
      cursor: "pointer",
      borderRadius: "4px",
      fontSize: "14px",
      fontWeight: "bold",
      transition: "background-color 0.3s ease",
    },
    toggleButtonHover: {
      backgroundColor: "#005f99",
    },
    headerTitle: {
      fontSize: "20px",
      margin: 0,
      fontWeight: "bold",
    },
  };

  const handleMouseOver = (e) => {
    e.target.style.backgroundColor = styles.toggleButtonHover.backgroundColor;
  };

  const handleMouseOut = (e) => {
    e.target.style.backgroundColor = styles.toggleButton.backgroundColor;
  };

  return (
    <header style={styles.header}>
      <button
        onClick={toggleSidePanel}
        style={styles.toggleButton}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {isSidePanelOpen ? "Close Sidebar" : "Open Sidebar"}
      </button>
      <h1 style={styles.headerTitle}>📄 Markdown Editor</h1>
    </header>
  );
};

export default Header;
