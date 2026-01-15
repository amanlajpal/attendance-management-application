import "./App.css";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import { ProtectedRoute } from "./components.jsx/protectedRoute";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<ProtectedRoute />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
