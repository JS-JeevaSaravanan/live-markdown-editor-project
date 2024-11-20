import React from "react";

const Footer = () => {
  const styles = {
    footer: {
      backgroundColor: "#333",
      color: "#fff",
      padding: "10px 20px",
      textAlign: "center",
      marginTop: "auto", // Ensures it stays at the bottom
    },
  };

  return (
    <footer style={styles.footer}>
      <p>&copy; 2024 Markdown Editor</p>
    </footer>
  );
};

export default Footer;
