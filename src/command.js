import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
  findNote,
  getallNotes,
  newNote,
  removeAllNotes,
  removeNote,
} from "./notes.js";
import { start } from "./server.js";

yargs(hideBin(process.argv))
  .command(
    "new <note>",
    "creates new note!",
    (yargs) => {
      return yargs.positional("note", {
        describe: "the note to create",
        type: "string",
      });
    },
    async (argv) => {
      const note = await newNote(argv.note);
      console.log(note);
    }
  )

  .command(
    "all",
    "gets all notes",
    () => {},
    async () => {
      const allNotes = await getallNotes();
      console.log(allNotes);
    }
  )

  .command(
    "find <filter>",
    "finds matched note",
    (yargs) => {
      return yargs.positional("filter", {
        describe: "the filter to find note",
        type: "string",
      });
    },
    async (argv) => {
      const hopes = await findNote(argv.filter);
      console.log(hopes);
    }
  )
  .command(
    "remove <id>",
    "remove a note by id",
    (yargs) => {
      return yargs.positional("id", {
        describe: "remove the note based on  id",
        type: "number",
      });
    },
    async (argv) => {
      const id = await removeNote(argv.id);
      console.log("Hope removed: " + id);
    }
  )
  .command(
    "clean",
    "remove all notes",
    () => {},
    () => {
      removeAllNotes();
      console.log("all notes removed!");
    }
  )

  .command(
    "web [port]",
    "start a web server",
    (yargs) => {
      return yargs.positional("port", {
        describe: "the port to start a web server",
        type: "number",
        default: 3000,
      });
    },
    async(argv) => {
      const notes = await getallNotes();
      start(notes);
    }
  )

  .demandCommand(1)
  .parse();
