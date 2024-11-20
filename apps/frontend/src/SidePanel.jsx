import React from "react";

const SidePanel = ({ isOpen }) => {
  const styles = {
    sidePanel: {
      width: "250px",
      backgroundColor: "#f4f4f4",
      borderRight: "1px solid #ddd",
      padding: "20px",
      position: "absolute",
      top: "50px", // Adjusted to avoid overlapping with the header
      left: 0,
      bottom: 0,
      transition: "transform 0.3s ease-in-out",
      transform: isOpen ? "translateX(0)" : "translateX(-100%)",
    },
  };

  return (
    <div style={styles.sidePanel}>
      <h3>Side Panel</h3>
      <p>Options and settings here...</p>
    </div>
  );
};

export default SidePanel;
