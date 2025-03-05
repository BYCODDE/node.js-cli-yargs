import fs from "fs/promises";
import http from "http";
import open from "open";

const interpolate = (html, data) => {
  const re = /{{\s*([^{}]+)\s*}}/g;
  return html.replace(re, (_, p1) => data[p1] || "");
};

const formatNotes = (notes) =>
  `<ul>${notes.map((note) => `<li>${note.content}</li>`).join("")}</ul>`;

const createServer = (notes) => {
  return http.createServer(async (req, res) => {
    const HTML_PATH = new URL("./template.html", import.meta.url);
    const html = await fs.readFile(HTML_PATH, "utf-8");
    const data = {
      notes: formatNotes(notes),
    };
    const htmlWithNotes = interpolate(html, data);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(htmlWithNotes);
  });
};

export const start = async (notes) => {
  const server = createServer(notes);

  server.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
    open(`http://localhost:3000`);
  });
};
