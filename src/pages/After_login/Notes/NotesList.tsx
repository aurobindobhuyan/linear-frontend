import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { EntityState } from "@reduxjs/toolkit/react";
import { RootState } from "../../../redux/store";
import { IUser, selectUserById } from "../../../redux/user/userSlice";
import { INote } from "../../../redux/notes/notesSlice";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { IconButton } from "@mui/material";

interface NotesListProps extends INote {
  showAllNotes: boolean;
  users: EntityState<IUser, string> | undefined;
}

const NotesList = ({ showAllNotes, users, ...note }: NotesListProps) => {
  const [open, setOpen] = useState(false);
  const user = useSelector((state: RootState) =>
    selectUserById(state, note.createdUserId)
  );

  useEffect(() => {
    if (showAllNotes) setOpen(true);
    else setOpen(false);
  }, [showAllNotes]);

  const handleToggleOpen = () => setOpen(!open);

  return (
    <>
      <tr className={`note-table-row ${open ? "row-opened" : ""}`}>
        <td style={{ flex: 0.5 }}>
          <Link className="link-style" to={`/notes/${note._id}`} key={note._id}>
            {note.ticket}
          </Link>
        </td>
        <td style={{ flex: 3, justifyContent: "flex-start" }}>
          <Link className="link-style" to={`/notes/${note._id}`} key={note._id}>
            {note.title}
          </Link>
        </td>
        <td style={{ flex: 0.5 }}>
          <IconButton
            className={`note-icon ${open ? "open" : ""}`}
            onClick={handleToggleOpen}
          >
            <KeyboardArrowDownIcon />
          </IconButton>
        </td>
        <td style={{ flex: 0.5 }}>{note.completed ? "Yes" : "No"}</td>
        <td style={{ flex: 1 }}>
          {new Date(note.createdAt).toLocaleDateString()}
        </td>
      </tr>

      {open && (
        <tr className={`row-table-rowInfo ${open ? "opened" : ""}`}>
          <td style={{ justifyContent: "flex-start" }} colSpan={5}>
            <div>Created By: {user.username}</div>
            <div>{note.body}</div>
          </td>
        </tr>
      )}
    </>
  );
};

export default NotesList;
