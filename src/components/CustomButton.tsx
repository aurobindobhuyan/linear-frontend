interface ICustomButton {
  text: string;
}

const CustomButton = ({ text }: ICustomButton) => {
  const style = {
    background:
      "radial-gradient(circle, rgba(173, 110, 241, 1) 0%, rgba(136, 177, 226, 1) 100%)",
    color: "white",
    padding: "10px",
    borderRadius: "5px",
    border: "0px",
    cursor: "pointer",
  };

  return <button style={style}>{text}</button>;
};

export default CustomButton;
