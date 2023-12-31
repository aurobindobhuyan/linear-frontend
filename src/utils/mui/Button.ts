const CustomButton = {
  MuiButton: {
    styleOverrides: {
      root: {
        color: "yellow",
        backgroundColor: "red",
        "&:hover": {
          backgroundColor: "orange", // Change the color for hover effect
        },
      },
    },
  },
};

export default CustomButton;
