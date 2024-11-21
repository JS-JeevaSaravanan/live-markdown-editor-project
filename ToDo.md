### Highlightings:

- **Code Block Support**
- **Quote Block Support**
- **Table Support**

### Features:

- Support **multiple files**
- **Local Storage** for file persistence
- **Font Color Change**
- **Code View** and **Preview** modes
- **Import and Export** files
- **Document File Name Editing**
- **Create & Delete Files**
- Implement **Keyboard Shortcuts**
- **Theme Change** (Light/Dark mode)
- **Font Size Change**
- **Font Family Change**
- **Line Numbers** in code view
- **Word Wrap** in code view
- **Search & Replace** functionality
- **Full Screen Zen Mode**

### Bugs:

- Fix **socketStatus** variable usage
- Improve **error handling** & UI feedback when socket fails or is unavailable

### To Check:

- Investigate if **max request limit** can be increased
- Implement **compress and decompress** in socket communication
- **Comment out backend cache**

### Tech Setup:

- **TypeScript**
- **ESLint**
- **Prettier**
- **Husky**
- **Lint-staged**
- **Commitlint**
- **Logger** setup

### Error Handling:

- **Input Validation** for Markdown
  - Handle edge cases (empty or malformed Markdown)
- **Server-Side Error Handling** (Markdown conversion errors, missing content)
- **Input Bar Errors**: Validate and handle errors in input fields
- **Socket Errors**: Improve socket error handling
- **Backend Logic Errors**: Handle errors from backend processes

### Security:

- **Sanitization** of converted HTML (Prevent XSS using libraries like **DOMPurify**)
- Implement **Content Security Policy (CSP)** to prevent malicious injections

### Logging and Monitoring (Optional):

- Set up **Logging** with libraries like **Winston** or **Morgan**
- Implement **Application Performance Monitoring (APM)** to track errors and performance

### UI/UX Enhancements:

- Implement **Light and Dark Mode** support
- **File and Folder Structure Revamp** for better organization
- Expose **environment variables** and remove sensitive data
- Ensure **items order** in local storage is maintained
- Ensure **active file content re-render** after changes

### Additional Tasks:

- **Import/Export** functionalities for file handling
- Host the application on a suitable platform

Here’s a suggested `README.md` file for the markdown editor project based on the features, tasks, and setup from the previous discussions:

---

# Markdown Editor

A modern Markdown editor with support for multiple files, live preview, syntax highlighting, and various customization options like theme change, font adjustments, and full-screen Zen mode.

## Features

- **Multiple Files Support**: Work with multiple Markdown files simultaneously.
- **Local Storage**: Files are stored in the browser’s local storage, allowing you to save your work across sessions.
- **Font Customization**: Change font size, font family, and font color.
- **Code View & Preview**: Toggle between code view and rendered preview for Markdown files.
- **Import & Export**: Import `.md` and `.html` files, export files in Markdown, HTML, styled HTML, or PDF formats.
- **File Management**: Create, delete, and rename files. Set document file names.
- **Keyboard Shortcuts**: Navigate and perform actions efficiently using customizable keyboard shortcuts.
- **Theme Toggle**: Switch between light and dark modes for better user experience.
- **Line Numbers**: Display line numbers in code view for better readability.
- **Word Wrap**: Enable/Disable word wrapping in code view.
- **Search & Replace**: Find and replace content across your files.
- **Zen Mode**: Enter full-screen mode for distraction-free writing.

## Bugs and Known Issues

- **SocketStatus**: Address variable usage and synchronization issues.
- **Error Handling**: Improve UI feedback when the socket connection fails or is unavailable.
- **File Handling**: Ensure proper handling of file states and UI updates after changes.

## Setup

To run the project locally:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/markdown-editor.git
   ```

2. **Install dependencies**:

   ```bash
   cd markdown-editor
   npm install
   ```

3. **Run the app**:

   ```bash
   npm start
   ```

   The app should now be available at `http://localhost:3000` (or the appropriate port).

## Tech Stack

- **Frontend**:
  - React for the user interface
  - Styled-components for CSS-in-JS styling
  - jsPDF for PDF export functionality
- **Backend (Optional)**:
  - WebSocket for real-time communication (e.g., Markdown to HTML conversion)
  - Express server (optional if using backend for markdown conversion)
  - Caching (optional, with backend caching disabled for this version)

## File Structure

- **`/src`**: Contains the main React application.
- **`/public`**: Contains static assets (e.g., index.html).
- **`/components`**: React components like the markdown editor, side panel, etc.
- **`/utils`**: Utility functions for file handling, conversion, etc.

## Features To Implement [Upcoming]

- **File Size Limit**: Investigate if the maximum request limit for file imports can be increased.
- **Socket Compression**: Implement compression and decompression for socket communication.
- **Cache Cleanup**: Remove backend caching and use a more suitable solution.

## Security Considerations [Upcoming]

- **HTML Sanitization**: Ensure the HTML output from Markdown conversion is sanitized using **DOMPurify** to prevent XSS (Cross-Site Scripting) attacks.
- **Content Security Policy (CSP)**: Implement a Content Security Policy (CSP) for added protection against content injection.

## Linting and Formatting [Upcoming]

This project uses the following tools to maintain code quality:

- **ESLint**: For linting the JavaScript/TypeScript code.
- **Prettier**: For code formatting.
- **Husky**: For running pre-commit hooks.
- **Lint-staged**: To ensure files are linted and formatted before commit.
- **Commitlint**: To enforce conventional commit messages.

To check or fix linting and formatting issues, you can run:

```bash
npm run lint
npm run format
```

## Error Handling

The application features robust error handling for various scenarios:

- **Input Validation**: Ensures that input markdown is valid and handles edge cases such as empty or malformed input.
- **Server Error Handling**: Catches errors during markdown conversion or socket communication issues.
- **UI Feedback**: Provides real-time error notifications to users when something goes wrong.

## Environment Variables

Make sure to set up necessary environment variables if required for the backend or deployment. You can store them in a `.env` file in the root of the project.

## Contribution Guidelines

If you want to contribute to this project, feel free to fork the repository, make your changes, and submit a pull request. Please follow the code style and make sure tests pass before submitting.

1. Fork the repo
2. Clone your fork locally
3. Create a new branch for your feature/bugfix
4. Make changes and test them
5. Commit your changes
6. Open a pull request against the main branch

---

## License

MIT License. See [LICENSE](./LICENSE) for more details.

---

This `README.md` provides an overview of the project, features, setup instructions, and contribution guidelines. Modify the sections as necessary based on your project specifics.
