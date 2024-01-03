import { useSelector } from "react-redux";
import { useGetPostsQuery, selectAllNotes } from "../../redux/notes/notesSlice";
import { Link } from "react-router-dom";

const Notes = () => {
  const { isLoading, error } = useGetPostsQuery({});
  const allNotes = useSelector(selectAllNotes);

  if (error) return <h1>Error occured in Notes page.</h1>;

  return (
    <div>
      <h1>Notes Page</h1>
      {isLoading ? (
        <h2>Loading.....</h2>
      ) : (
        allNotes.map((note) => {
          return <Link to={`/notes/${note._id}`} key={note._id} onClick={() => {}}>{note.title}</Link>;
        })
      )}
    </div>
  );
};

export default Notes;
