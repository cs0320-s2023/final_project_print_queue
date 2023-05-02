import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/Home";
import ResourcesPage from "./pages/ResourcesPage/ResourcesPage";
import PrintersPage from "./pages/PrintersPage/PrintersPage";
import QueuePage from "./pages/QueuePage/QueuePage";
import Profile from "./pages/Auth/profile";
import Login from "./pages/Auth/login";

import { ChakraBaseProvider } from "@chakra-ui/react";
import theme from "../src/theme";
import Layout from "./components/Layout";
import { AuthorizationProvider } from "./utils/Authorization/AuthorizationProvider";
import {
  PermissionValues,
  PermissionsProvider,
} from "./utils/Permissions/PermissionProvider";
import { ProtectedRoute } from "./components/ProtectedRute";
import AdminDashboard from "./pages/AdminDash";

function App() {
  return (
    <ChakraBaseProvider theme={theme}>
      <AuthorizationProvider>
        <PermissionsProvider permissions={[PermissionValues.view]}>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/resources" element={<ResourcesPage />} />
                <Route path="/queue" element={<QueuePage />} />
                <Route path="/printers" element={<PrintersPage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/auth/login" element={<Login />} />
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Layout>
          </Router>
        </PermissionsProvider>
      </AuthorizationProvider>
    </ChakraBaseProvider>
  );
}

export default App;
