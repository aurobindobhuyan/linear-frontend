import CustomButton from "./CustomButton";
import "./tableHeader.css";

interface ITableHeader {
  title: string;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleButton?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const TableHeader = ({ title, handleInput }: ITableHeader) => {
  return (
    <div className="note-header">
      <h1>{`${title}s`}</h1>
      <div>
        <input
          onChange={handleInput}
          type="text"
          placeholder={`Search ${title}s`}
        />
        <CustomButton text={`Create ${title}`} />
      </div>
    </div>
  );
};

export default TableHeader;
