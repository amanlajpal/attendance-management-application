import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axiosInstance from "../utility/axiosInstance";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  let navigate = useNavigate();
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const response = await axiosInstance.get("/auth/profile");
      const user = response.data.data;
      setUser(user);
      return user;
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const logout = async () => {
    try {
      const response = await axiosInstance.post("/auth/logout");
      navigate("/login");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const value = useMemo(() => {
    console.log("user from usememo", user);
    return {
      user,
      getUser,
      logout,
    };
  }, [user]);

  return <AuthContext value={value}>{children}</AuthContext>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
