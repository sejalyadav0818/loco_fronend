import React from "react";
import NavBar from "./Components/NavBar";
import LocationForm from "./Pages/LocationForm";

import ShowData from "./Pages/ShowData";
import { Route, Routes } from "react-router-dom";

function App() {
  const [darkMode, setDarkMode] = React.useState(true);

  function toggleDarkMode() {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  }

  // const appClasses = `h-full w-full mx-auto py-2 ${darkMode ? "dark" : ""}`;

  return (
    <div>
      <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <Routes>
        <Route path="/" element={<LocationForm />} />
        <Route path="/show" element={<ShowData />} />
      </Routes>
    </div>
  );
}

export default App;
