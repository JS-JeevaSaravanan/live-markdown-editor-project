const Footer = () => {
  const styles = {
    footer: {
      backgroundColor: "#1e1e1e", // Dark gray background
      color: "#f5f5f5", // Light text for contrast
      padding: "10px 20px",
      textAlign: "right",
      fontFamily: "Consolas, 'Courier New', monospace", // Coding-style font
      fontSize: "14px", // Subtle font size for footer
      borderTop: "1px solid #444", // Lighter and thinner border
      marginTop: "auto", // Ensures it stays at the bottom
    },
    link: {
      color: "#007acc", // Vibrant blue for links
      textDecoration: "none",
      fontWeight: "bold",
      transition: "color 0.3s ease",
    },
    linkHover: {
      color: "#005f99", // Darker blue on hover
    },
  };

  const handleMouseOver = (e) => {
    e.target.style.color = styles.linkHover.color;
  };

  const handleMouseOut = (e) => {
    e.target.style.color = styles.link.color;
  };

  return (
    <footer style={styles.footer}>
      <p>
        &copy; 2024 Markdown Editor. Developed with ❤️ by{" "}
        <a
          href="https://js-jeevasaravanan-portfolio.vercel.app/"
          style={styles.link}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          target="_blank"
          rel="noopener noreferrer"
        >
          Jeeva Saravanan
        </a>
      </p>
    </footer>
  );
};

export default Footer;
