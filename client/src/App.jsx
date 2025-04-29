import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./pages/Home";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        {/* <Route path="dashboard" element={<Projects />} />
        <Route path="profile" element={<Profile />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}
