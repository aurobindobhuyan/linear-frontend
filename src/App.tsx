import { useState } from "react";
import Navbar from "./pages/Layout/Navbar";
import "./global.css"

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  const toggleIsLoggedIn = () => setIsLoggedIn(!isLoggedIn);

  return <Navbar isLoggedIn={isLoggedIn} toggleLogin={toggleIsLoggedIn} />;
};

export default App;
