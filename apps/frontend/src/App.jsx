import { useState, useEffect, useCallback, useRef } from "react";
import { processMdToHTML } from "./utils"; // Utility function to convert markdown to HTML
import { useDebounce } from "./customHooks"; // Custom debounce hook
import Header from "./Header";
import SidePanel from "./SidePanel";
import MainSection from "./MainSection";
import Footer from "./Footer";

const App = () => {
  const [markdown, setMarkdown] = useState(""); // Markdown text state
  const [htmlOutput, setHtmlOutput] = useState(""); // HTML output state
  const [loading, setLoading] = useState(false); // Loading state
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(true); // State for side panel visibility

  const debouncedValue = useDebounce(markdown, 200); // Debounced markdown input value

  // Cache for storing converted Markdown chunks
  const cache = useRef(new Map());

  useEffect(() => {
    processMarkdown(debouncedValue);
  }, [debouncedValue]);

  const processMarkdown = useCallback(async (newMdText) => {
    setLoading(true);
    const newHtmlOutput = await processMdToHTML(newMdText, cache);
    setHtmlOutput(newHtmlOutput); // Update HTML output
    setLoading(false); // Set loading to false
  }, []);

  const handleInputChange = (e) => {
    setMarkdown(e.target.value); // Update markdown text state
  };

  const toggleSidePanel = () => {
    setIsSidePanelOpen((prev) => !prev);
  };

  return (
    <div style={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      {/* Header */}
      <Header
        toggleSidePanel={toggleSidePanel}
        isSidePanelOpen={isSidePanelOpen}
      />

      {/* Main Content Area */}
      <div style={{ display: "flex", flex: 1 }}>
        {/* Side Panel */}
        <SidePanel isOpen={isSidePanelOpen} />

        {/* Main Section: Editor and Output */}
        <MainSection
          markdown={markdown}
          htmlOutput={htmlOutput}
          loading={loading}
          handleInputChange={handleInputChange}
          isSidePanelOpen={isSidePanelOpen}
        />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
