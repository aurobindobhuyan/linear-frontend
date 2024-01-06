import { useSelector } from "react-redux";
import { useGetPostsQuery, selectNoteById } from "../../../redux/notes/notesSlice";
import { selectUserById, useGetUserQuery } from "../../../redux/user/userSlice";
import { RootState } from "../../../redux/store";
import { useParams } from "react-router-dom";

const NoteId = () => {
  const { id } = useParams<string>();

  if (!id) {
    return <div>No note ID provided</div>;
  }
  const { isLoading: userLoading } = useGetUserQuery({});
  const { isLoading: postLoading } = useGetPostsQuery({});
  const post = useSelector((state: RootState) => selectNoteById(state, id));
  const createdUser = useSelector((state: RootState) =>
    selectUserById(state, post?.createdUserId ?? id)
  );

  return (
    <div>
      {!post ? (
        <h1>No Posts found with this id</h1>
      ) : !postLoading && !userLoading ? (
        <>
          <p>Ticket No. #{post?.ticket}</p>
          <h1>Title: {post?.title}</h1>
          <p>Body: {post?.body}</p>
          <p>CreatedBy: {createdUser?.username}</p>
        </>
      ) : (
        <h1>Loading....</h1>
      )}
    </div>
  );
};

export default NoteId;
