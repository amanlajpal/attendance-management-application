import "./App.css";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import { ProtectedRoute } from "./components.jsx/protectedRoute";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Register from "./pages/register";

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
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<ProtectedRoute />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
