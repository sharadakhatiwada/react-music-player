import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// // Bootstrap CSS
// import "bootstrap/dist/css/bootstrap.min.css";
// // Bootstrap Bundle JS
// import "bootstrap/dist/js/bootstrap.bundle.min";
import Containers from "./components/music/Containers";

import FooterContent from "./components/music/Footer";
import UserTable from "./components/user/User";
import Dashboard from "./components/music/Dashboard";
import Login from "./components/user/LoginPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route path="/users" element={<UserTable />} />
            <Route path="/musicList" element={<Containers />} />
            {/* <Route path="*" element={<NoPage />} /> */}
          </Route>
          <Route path="/sign-in" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
