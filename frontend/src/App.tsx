import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/Home";
import ResourcesPage from "./pages/ResourcesPage/ResourcesPage";
import PrintersPage from "./pages/PrintersPage/PrintersPage";
import QueuePage from "./pages/QueuePage/QueuePage";
import Nav from "./components/Nav";
import Login from "./pages/Auth/Login";
import Profile from "./pages/Auth/profile";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/queue" element={<QueuePage />} />
        <Route path="/printers" element={<PrintersPage />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
