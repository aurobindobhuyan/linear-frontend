import { useState } from "react";
import Navbar from "./Navbar";
import "./global.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const toggleIsLoggedIn = () => setIsLoggedIn(!isLoggedIn);

  return <Navbar isLoggedIn={isLoggedIn} toggleLogin={toggleIsLoggedIn} />;
};

export default App;
