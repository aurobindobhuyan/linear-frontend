import { useSelector } from "react-redux";
import { useGetOnePostQuery } from "../../redux/notes/notesSlice";
import { selectUserById, useGetUserQuery } from "../../redux/user/userSlice";
import { RootState } from "../../redux/store";
import { useParams } from "react-router-dom";

const NoteId = () => {
  const { id } = useParams<string>();
  const { isLoading: userLoading } = useGetUserQuery({});
  const { data, isLoading: postLoading } = useGetOnePostQuery(id);

  if (!id) {
    return <div>No note ID provided</div>;
  }

  const createdUser = useSelector((state: RootState) =>
    selectUserById(state, data?.entities[id]?.createdUserId ?? id)
  );

  return (
    <div>
      {!postLoading && !userLoading ? (
        <>
          <h1>Title: {data?.entities[id]?.title}</h1>
          <p>Body: {data?.entities[id]?.body}</p>
          <p>CreatedBy: {createdUser?.username}</p>
        </>
      ) : (
        <h1>Loading....</h1>
      )}
    </div>
  );
};

export default NoteId;
