import { useSelector } from "react-redux";
import {
  useGetPostsQuery,
  selectAllNotes,
  INote,
} from "../../../redux/notes/notesSlice";
import { useGetUserQuery } from "../../../redux/user/userSlice";

import NotesList from "./NotesList";

const Notes = () => {
  const { isLoading, error } = useGetPostsQuery({});
  const { data: allUsers, error: userError } = useGetUserQuery({});
  const allNotes: INote[] = useSelector(selectAllNotes);

  if (error) return <h1>Error occured in Notes page.</h1>;

  return (
    <div>
      <h1>Notes Page</h1>
      <br />
      {isLoading && userError ? (
        <h2>Loading.....</h2>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead className="table-head">
              <tr>
                <th>Ticket</th>
                <th>Title</th>
                <th>Open</th>
                <th>Completed</th>
                <th>CreatedAt</th>
              </tr>
            </thead>

            <tbody>
              {allNotes.map((note) => {
                return <NotesList key={note._id} users={allUsers} {...note} />;
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Notes;
