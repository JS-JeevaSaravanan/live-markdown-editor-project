import { useState, useEffect, useCallback, useRef } from "react";
import { processMdToHTML } from "./utils"; // Utility function to convert markdown to HTML
import { useDebounce } from "./customHooks"; // Custom debounce hook
import Header from "./Header";
import SidePanel from "./SidePanel";
import MainSection from "./MainSection";
import Footer from "./Footer";

const App = () => {

  const [isSidePanelOpen, setIsSidePanelOpen] = useState(true); // State for side panel visibility


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
          isSidePanelOpen={isSidePanelOpen}
        />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
