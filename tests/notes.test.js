import { beforeEach, expect, jest, test } from "@jest/globals";
jest.unstable_mockModule("../src/db.js", () => ({
  insertDB: jest.fn(),
  getDB: jest.fn(),
  saveDB: jest.fn(),
}));

const { getDB, insertDB, saveDB } = await import("../src/db.js");
const { newNote, getallNotes, removeNote } = await import("../src/notes.js");

beforeEach(() => {
  getDB.mockClear();
  insertDB.mockClear();
  saveDB.mockClear();
});

test("newNote inserts data to db", async () => {
  const note = {
    id: Date.now(),
    content: "test note",
  };

  insertDB.mockResolvedValue(note.content);

  const result = await newNote(note.content);
  expect(result).toEqual(note);
});

test("getallNotes returns data from db", async () => {
  const notes = {
    content: ["test note", "test note 2"],
  };

  getDB.mockResolvedValue({ notes });

  const result = await getallNotes();
  expect(result).toEqual(notes);
});



