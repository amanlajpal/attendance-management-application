import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axiosInstance from "../utility/axiosInstance.js";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Register() {
  const handleRegister = async (formData) => {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await axiosInstance.post("/auth/register", {
        name,
        email,
        password,
      });
      alert(response.data.message);
      handleRedirectToLogin();
    } catch (error) {
      alert("User registeration failed!");
    }
  };

  const [isHidden, setIsHidden] = useState(true);
  const navigate = useNavigate();

  const handlePasswordVisibility = () => {
    setIsHidden((prevIsHidden) => {
      return !prevIsHidden;
    });
  };

  const handleRedirectToLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="bg-slate-100 h-screen flex justify-center items-center">
        <div className="w-sm h-3/4 px-4 py-7 bg-white rounded-md">
          <div className="flex flex-col justify-between h-full gap-10">
            <div>
              <h2 className="text-center text-2xl">Register to</h2>
              <p className="text-center">Attendance Tracking Application</p>
            </div>
            <form
              className="flex flex-col gap-10 h-full"
              action={handleRegister}
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your Name"
                    className="px-2 py-1 border-2 border-gray-300 rounded h-full"
                  ></input>
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your Email"
                    className="px-2 py-1 border-2 border-gray-300 rounded h-full"
                  ></input>
                </div>
                <div className="flex w-full">
                  <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="password">Password</label>
                    <div className="flex gap-2">
                      <div className="flex-auto w-full">
                        <input
                          type={isHidden ? "password" : "text"}
                          id="password"
                          name="password"
                          placeholder="Enter your Password"
                          className="px-2 py-1 border-2 border-gray-300 rounded w-full h-full"
                        ></input>
                      </div>
                      <div className="flex-auto">
                        <IconButton
                          aria-label={`${isHidden ? "show" : "hide"} password`}
                          onClick={handlePasswordVisibility}
                          size="small"
                        >
                          {isHidden ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <Button type="submit" variant="contained" fullWidth>
                  Signup
                </Button>
                <p className="text-center">
                  Already have an account ?{" "}
                  <button
                    onClick={handleRedirectToLogin}
                    className="text-blue-600 dark:text-sky-400"
                  >
                    Login
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
