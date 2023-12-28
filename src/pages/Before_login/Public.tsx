import { Link } from "react-router-dom";

const Public = (props: { data: string }) => {
  const { data } = props;
  return (
    <>
      <h1>Public page</h1>
      <Link to={"/login"}>{data}</Link>
    </>
  );
};

export default Public;
