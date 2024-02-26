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
    if (value === "&laquo;") {
      setPage(1);
    } else if (value === "&lsaquo;") {
      setPage(page - 1);
    } else if (value === "&rsaquo;") {
      setPage(page + 1);
    } else if (value === "&raquo;") {
      setPage(totalPage);
    } else if (value === " ...") {
      const nextPage = Math.min(page + 1 * 2 + 1, totalPage);
      setPage(nextPage);
    } else if (value === "... ") {
      const prevPage = Math.max(page - 1 * 2 - 1, 1);
      setPage(prevPage);
    } else {
      setPage(Number(value));
    }
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = Number(e.target.value);
    const newTotalPage = Math.ceil(allNotes.length / newLimit);
    if (page > newTotalPage) {
      setPage(newTotalPage);
    }
    setLimit(newLimit);
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
            <div className="pagination">
              <div className="pagination">
                <Pagination
                  totalPage={totalPage}
                  page={page}
                  limit={limit}
                  siblings={1}
                  handlePageChange={handlePageChange}
                />
                <div>
                  <select onChange={handleLimitChange}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                  </select>
                  <span>Items Per page</span>
                </div>
              </div>
              <div className="pagination-summary">
                <span>{`${startIndex + 1} - ${Math.min(
                  startIndex + limit,
                  allNotes.length
                )} of ${allNotes.length} items`}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotesTable;
