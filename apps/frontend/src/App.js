import axios from "axios";

const App = () => {
  const [markdown, setMarkdown] = useState("");
  const [htmlOutput, setHtmlOutput] = useState("");

  const convertToHtml = async () => {
    try {
      const response = await axios.post("http://localhost:5000/convert", { markdown });
      setHtmlOutput(response.data.html);
    } catch (error) {
      console.error("Error converting Markdown:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <textarea
        style={{ width: "45%", height: "90vh", fontSize: "16px" }}
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        placeholder="Type Markdown here..."
      />
      
      <button onClick={convertToHtml} style={{ margin: "10px 0", padding: "10px" }}>
        Convert to HTML (Backend)
      </button>

      <div style={{ width: "45%", height: "90vh", overflowY: "auto", border: "1px solid #ddd", padding: "10px" }}>
        <div dangerouslySetInnerHTML={{ __html: htmlOutput }} />
      </div>
    </div>
  );
};

export default App;
