import { purple } from "@mui/material/colors";

const CustomAppBar = {
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: purple[300],
        boxShadow: "none",
        height: "50px",
        justifyContent: "center",
      },
    },
  },
};

export default CustomAppBar;
