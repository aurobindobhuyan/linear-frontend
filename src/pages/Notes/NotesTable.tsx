import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetPostsQuery } from "../../redux/notes/notesSlice";
import { selectAllNotes, INote } from "../../redux/notes/notesSlice";
import { useGetUserQuery } from "../../redux/user/userSlice";

import { IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import NotesTableRow from "./NotesTableRow";
import NoteTableHeader from "./NoteTableHeader";
import "./note.css";
import Pagination from "../../components/Pagination";

const NotesTable = () => {
  const [showAllNotes, setShowAllNotes] = useState(false);
  const { isLoading, error } = useGetPostsQuery({});
  const {
    data: allUsers,
    error: userError,
    isLoading: userLoading,
  } = useGetUserQuery({});
  const allNotes: INote[] = useSelector(selectAllNotes);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  if (error || error?.data?.message || userError?.data?.message) {
    throw new Error(error.data.message || userError?.data?.message);
  }

  const handleShowNotes = () => setShowAllNotes(!showAllNotes);

  const totalPage = Math.ceil(allNotes.length / limit);
  const startIndex = (page - 1) * limit;
  const notesToShow = allNotes.slice(startIndex, startIndex + limit);

  const handlePageChange = (value: string) => {
    if (value === "&laquo;" || value === "... ") {
      setPage(1);
    } else if (value === "&lsaquo;") {
      setPage(page - 1);
    } else if (value === "&rsaquo;") {
      setPage(page + 1);
    } else if (value === "&raquo;" || value === " ...") {
      setPage(totalPage);
    } else {
      setPage(Number(value));
    }
  };

  return (
    <div>
      {isLoading && userLoading && userError ? (
        <h2>Loading.....</h2>
      ) : (
        <>
          <div className="note-parent">
            <NoteTableHeader />
            <div className="note-table-container">
              <table className="note-table">
                <thead>
                  <tr className="note-table-row">
                    <th style={{ flex: 0.5 }}>Ticket</th>
                    <th style={{ flex: 3, justifyContent: "flex-start" }}>
                      Title
                    </th>
                    <th style={{ flex: 0.5 }}>
                      <Tooltip
                        title={showAllNotes ? "Hide" : "Show"}
                        arrow
                        describeChild
                      >
                        <IconButton color="inherit" onClick={handleShowNotes}>
                          {showAllNotes ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </Tooltip>
                    </th>
                    <th style={{ flex: 0.5 }}>Completed</th>
                    <th style={{ flex: 1 }}>CreatedAt</th>
                  </tr>
                </thead>

                <tbody>
                  {notesToShow.map((note) => {
                    return (
                      <NotesTableRow
                        key={note._id}
                        showAllNotes={showAllNotes}
                        users={allUsers}
                        {...note}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div>
              <Pagination
                totalPage={totalPage}
                page={page}
                limit={limit}
                siblings={1}
                handlePageChange={handlePageChange}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotesTable;
