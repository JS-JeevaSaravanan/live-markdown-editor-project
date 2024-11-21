# Markdown Editor

A modern Markdown editor with live preview, syntax highlighting, and support for multiple files. This editor allows users to write, preview, and manage their Markdown documents with features like local storage, import/export functionality, and real-time collaboration.

## Features

- **Multiple Files Support**: Work with multiple Markdown files simultaneously.
- **Local Storage**: Files are stored in the browser’s local storage, enabling persistent work across sessions.
- **Code View & Live Preview**: Toggle between the code view and rendered preview of Markdown files.
- **Import & Export**: Import `.md` and `.html` files; export documents in Markdown, HTML, styled HTML, or PDF formats.
- **File Management**: Create, delete, and rename files. Set custom document file names.
- **Real-Time Preview**: See live updates as you write Markdown content.
- **Syntax Highlighting**: Enhanced code display for better readability.

## Tech Stack

- **Frontend**:
  - **React**: For building the user interface.
  - **jsPDF**: To enable PDF export functionality.
- **Backend (Optional)**:
  - **WebSocket**: For real-time communication and collaboration.
  - **Express.js**: Backend server to handle file imports, exports, and real-time connections.

## Setup

To run the project locally, follow the steps below:

### 1. Clone the repository:

```bash
git clone https://github.com/JS-JeevaSaravanan/live-markdown-editor-project.git
cd live-markdown-editor-project
```

### 2. Install dependencies:

```bash
yarn install
```

### 3. Run the project:

```bash
yarn run dev
```

- The frontend will be available at [http://localhost:3000](http://localhost:3000).
- The backend server (if used) will run at [http://localhost:5002](http://localhost:5002).

## File Structure

- **`/src`**: Contains the main React application and components.
  - **`/components`**: React components, including the Markdown editor, side panel, etc.
  - **`/utils`**: Utility functions for file handling, conversion, etc.
- **`/public`**: Contains static assets such as `index.html`.
