const CustomButton = {
  MuiButton: {
    styleOverrides: {
      containedError: {
        color: "yellow",
        backgroundColor: "red",
        fontWeight: "bold",
        "&:hover": {
          backgroundColor: "orange", // Change the color for hover effect
        },
      },
    },
  },
};

export default CustomButton;
