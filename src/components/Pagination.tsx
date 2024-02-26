import _ from "lodash";
import "./pagination.css";

interface IPaginationRange {
  totalPage: number;
  page: number;
  limit: number;
  siblings: number;
}

interface IPagination {
  totalPage: number;
  page: number;
  limit: number;
  siblings: number;
  handlePageChange: (value: string) => void;
}

export const paginationRange = ({
  totalPage,
  page,
  limit,
  siblings,
}: IPaginationRange) => {
  let totalPageNoInArray = 7 + siblings;

  if (totalPageNoInArray >= totalPage) {
    return _.range(1, totalPage + 1);
  }

  let leftSiblingsIndex = Math.max(page - siblings, 1);
  let rightSiblingsIndex = Math.min(page + siblings, totalPage);

  let showLeftDots = leftSiblingsIndex > 2;
  let showRightDots = rightSiblingsIndex < totalPage - 2;

  if (!showLeftDots && showRightDots) {
    let leftItemsCount = 3 + 2 * siblings;
    let leftRange = _.range(1, leftItemsCount + 1);
    return [...leftRange, " ...", totalPage];
  } else if (showLeftDots && !showRightDots) {
    let rightItemsCount = 3 + 2 * siblings;
    let rightRange = _.range(totalPage - rightItemsCount + 1, totalPage + 1);
    return [1, "... ", ...rightRange];
  } else {
    let middleRange = _.range(leftSiblingsIndex, rightSiblingsIndex + 1);
    return [1, "... ", ...middleRange, " ...", totalPage];
  }
};

const Pagination = ({
  totalPage,
  page,
  limit,
  siblings,
  handlePageChange,
}: IPagination) => {
  const paginationButtons = paginationRange({
    totalPage,
    page,
    limit,
    siblings,
  });

  return (
    <div className="pagination">
      <ul className="ul">
        <li className="list" onClick={() => handlePageChange("&laquo;")}>
          <button className="btn">&laquo;</button>
        </li>
        <li className="list" onClick={() => handlePageChange("&lsaquo;")}>
          <button className="btn" disabled={page == 1}>
            &lsaquo;
          </button>
        </li>
        {paginationButtons.map((ele) => {
          return (
            <li
              key={ele}
              className="list"
              onClick={() => handlePageChange(String(ele))}
              value={ele}
            >
              <button
                className={`${ele === page ? "active" : "not-active"} btn`}
              >
                {ele}
              </button>
            </li>
          );
        })}
        <li className="list" onClick={() => handlePageChange("&rsaquo;")}>
          <button className="btn" disabled={page == totalPage}>
            &rsaquo;
          </button>
        </li>
        <li className="list" onClick={() => handlePageChange("&raquo;")}>
          <button className="btn">&raquo;</button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
