import React from 'react';
import {Route, Router, Routes} from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <div>
        Something
      <Routes>
        <Route element={<Home />} path='/home' />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
