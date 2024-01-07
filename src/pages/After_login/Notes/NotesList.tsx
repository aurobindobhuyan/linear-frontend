import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { EntityState } from "@reduxjs/toolkit/react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { IconButton } from "@mui/material";

import { Link } from "react-router-dom";
import { INote } from "../../../redux/notes/notesSlice";
import { IUser, selectUserById } from "../../../redux/user/userSlice";

interface NotesListProps extends INote {
  users: EntityState<IUser, string> | undefined;
}

const NotesList = ({ users, ...note }: NotesListProps) => {
  const [open, setOpen] = useState(false);
  const user = useSelector((state: RootState) =>
    selectUserById(state, note.createdUserId)
  );

  const handleToggleOpen = () => setOpen(!open);

  return (
    <>
      <tr>
        <td>
          <Link className="link-style" to={`/notes/${note._id}`} key={note._id}>
            {note.ticket}
          </Link>
        </td>
        <td>
          <Link className="link-style" to={`/notes/${note._id}`} key={note._id}>
            {note.title}
          </Link>
        </td>
        <td>
          <IconButton className={`icon ${open ? "open" : ""}`} onClick={handleToggleOpen}>
            <KeyboardArrowDownIcon />
          </IconButton>
        </td>
        <td>{note.completed ? "Yes" : "No"}</td>
        <td>{new Date(note.createdAt).toLocaleDateString()}</td>
      </tr>
      {open && (
        <tr className={`table-row ${open ? "opened" : ""}`}>
          <td colSpan={5}>
            <div>Created By: {user.username}</div>
            <div>{note.body}</div>
          </td>
        </tr>
      )}
    </>
  );
};

export default NotesList;
