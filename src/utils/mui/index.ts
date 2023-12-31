import CustomAppBar from "./AppBar";
import CustomButton from "./Button";

export const muiCustom = () => {
  return { ...CustomButton, ...CustomAppBar };
};
