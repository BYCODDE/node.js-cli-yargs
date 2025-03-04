import { beforeEach, expect, jest, test } from "@jest/globals";
import { removeAllNotes } from "../src/notes.js";
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
  const note = {
    notes: ["test note", "test note 2"],
  };

  getDB.mockResolvedValue(note);

  const result = await getallNotes();
  expect(result).toEqual(note.notes);
});

test("removeNote removes data from db", async () => {
  const notes = [
    {
      id: 1,
      content: "test note",
    },
    {
      id: 2,
      content: "test note 2",
    },
    {
      id: 3,
      content: "test note 3",
    },
    {
      id: 4,
      content: "test note 4",
    },
    {
      id: 5,
      content: "test note 5",
    },
  ];

  saveDB.mockResolvedValue(notes);

  const result = await removeNote(undefined);

  expect(result).toBeUndefined();
});

test("removeAllNotes removes all data from db", async () => {
  const notes = [
    {
      id: 1,
      content: "test note",
    },
    {
      id: 2,
      content: "test note 2",
    },
    {
      id: 3,
      content: "test note 3",
    },
  ];

  saveDB.mockResolvedValue(notes);

  const result = await removeAllNotes();

  expect(result).toEqual({ notes: [] });
});
