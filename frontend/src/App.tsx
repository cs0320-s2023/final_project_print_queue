import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/Home";
import ResourcesPage from "./pages/ResourcesPage/ResourcesPage";
import PrintersPage from "./pages/PrintersPage/PrintersPage";
import QueuePage from "./pages/QueuePage/QueuePage";
import Login from "./pages/Auth/login";
import Profile from "./pages/Auth/profile";

import { ChakraBaseProvider } from "@chakra-ui/react";
import theme from "../src/theme";
import Layout from "./components/Layout";

function App() {
  return (
    <ChakraBaseProvider theme={theme}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/queue" element={<QueuePage />} />
            <Route path="/printers" element={<PrintersPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/auth/login" element={<Login />} />
          </Routes>
        </Layout>
      </Router>
    </ChakraBaseProvider>
  );
}

export default App;
