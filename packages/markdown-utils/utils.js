const { marked } = require("marked");

const convertMarkdownToHtml = (markdown) => marked(markdown);

module.exports = { convertMarkdownToHtml };
