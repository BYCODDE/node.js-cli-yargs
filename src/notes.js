import { getDB, saveDB, insertDB } from "./db.js";

export const newNote = async (note) => {
  const data = {
    content: note,
    id: Date.now(),
  };
  await insertDB(data);
  return data;
};

export const getallNotes = async () => {
  const db = await getDB();
  return db.notes;
};

export const findNote = async (filter) => {
  const allNotes = await getallNotes();
  return allNotes.filter((note) =>
    note.content.toLowerCase().includes(filter.toLowerCase())
  );
};

export const removeNote = async (id) => {
  const notes = await getallNotes();
  const matched = notes.find((note) => note.id === id);
  if (matched) {
    const newNotes = notes.filter((note) => note.id !== id);
    await saveDB({ notes: newNotes });
    return id;
  }
};

export const removeAllNotes = () => {
  saveDB({ notes: [] });
  return { notes: [] };
};
