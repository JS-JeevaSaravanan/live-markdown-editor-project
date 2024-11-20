const Header = ({ toggleSidePanel, isSidePanelOpen }) => {
  const styles = {
    header: {
      backgroundColor: "#333",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      padding: "10px 20px",
      justifyContent: "space-between",
    },
    toggleButton: {
      backgroundColor: "#444",
      color: "#fff",
      border: "none",
      padding: "8px 12px",
      cursor: "pointer",
      borderRadius: "4px",
    },
    headerTitle: {
      fontSize: "24px",
      margin: 0,
    },
  };

  return (
    <header style={styles.header}>
      <button onClick={toggleSidePanel} style={styles.toggleButton}>
        {isSidePanelOpen ? "Close Sidebar" : "Open Sidebar"}
      </button>
      <h1 style={styles.headerTitle}>Markdown Editor</h1>
    </header>
  );
};

export default Header;
