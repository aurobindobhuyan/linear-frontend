import { useSelector } from "react-redux";
import { selectNoteById } from "../../redux/notes/notesSlice";
import { selectUserById } from "../../redux/user/userSlice";
import { RootState } from "../../redux/store";
import { useParams } from "react-router-dom";

const NoteId = () => {
  const { id } = useParams<string>();
  if (!id) {
    return <div>No note ID provided</div>;
  }
  const note = useSelector((state: RootState) => selectNoteById(state, id));
  const createdUser = useSelector((state: RootState) =>
  selectUserById(state, note.createdUserId)
  );

  return (
    <div>
      <h1>Title: {note.title}</h1>
      <p>Body: {note.body}</p>
      <p>CreatedBy: {createdUser.username}</p>
    </div>
  );
};

export default NoteId;
