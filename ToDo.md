
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
