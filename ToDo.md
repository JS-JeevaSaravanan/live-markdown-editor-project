https://pandao.github.io/editor.md/en.html

dillinger.io

https://onlinemarkdowneditor.dev/collaboration/#doce0df025579

Highlightings:

- code block
- quote block
- table

Features:

- multiple files
- local storage
- font color changes
- code view and preview
- import and export
- document file name and edit
- delete and create file
- keyboard shortcut
- theme change
- font size change
- font family change
- line number
- word wrap
- search and replace
- full screen zen mode

Bugs:

File changes:

- socketstatus variable useage
- error handling and UI intimation - when socket failed or not worked

To check:

- max request limit can be increased
- compress and decompress in socketing..

- comment backend cache..

typescript
eslint
prettier
husky
lint-staged
commitlint


logger

Error handlings:

- input bars
- socket
- backend logics

**Input Validation**: Ensure the input Markdown is valid and handle edge cases (e.g., empty input or malformed Markdown).

- **Error Handling**: Properly handle errors on the server side (e.g., if Markdown fails to convert for some reason, or if there's no content sent in the request).

Security:
**Sanitization**: Ensure the converted HTML is sanitized to prevent any security vulnerabilities like **XSS (Cross-Site Scripting)** attacks. Libraries like **DOMPurify** can be used to sanitize the HTML output before sending it to the client.

- **Content Security Policy (CSP)**: Use a CSP to prevent malicious content from being injected into your application.

### 7. **Logging and Monitoring (Optional)**

- **Logging**: Use a logging library like **winston** or **morgan** to track API requests and any potential issues.
- **Monitoring**: Consider implementing application performance monitoring (APM) to track performance, errors, and usage.


light and dark mode implementation... 

file and folder structure revamp...
