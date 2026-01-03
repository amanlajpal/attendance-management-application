import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

export default function Login() {
  const handleLogin = (event) => {};
  const [isHidden, setIsHidden] = useState(true);

  const handlePasswordVisibility = () => {
    setIsHidden((prevIsHidden) => {
      return !prevIsHidden;
    });
  };

  return (
    <>
      <div className="w-sm h-3/4 px-4 py-7 bg-white rounded-md">
        <div className="flex flex-col justify-between h-full gap-10">
          <div>
            <h2 className="text-center text-2xl">Welcome to</h2>
            <p className="text-center">Attendance Tracking Application</p>
          </div>
          <form className="flex flex-col gap-10 h-full">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your Email"
                  className="px-2 py-1 border-2 border-gray-300 rounded h-full"
                  autoComplete="true"
                ></input>
              </div>
              <div className="flex w-full">
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="password">Password</label>
                  <div className="flex gap-2">
                    <div className="flex-auto w-full">
                      <input
                        type={isHidden ? "password" : "text"}
                        id="password"
                        placeholder="Enter your Password"
                        className="px-2 py-1 border-2 border-gray-300 rounded w-full h-full"
                        autoComplete="true"
                      ></input>
                    </div>
                    <div className="flex-auto">
                      <IconButton
                        aria-label={`${isHidden ? "show" : "hide"} password`}
                        onClick={handlePasswordVisibility}
                        size="small"
                      >
                        {isHidden ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Button variant="contained" onClick={handleLogin} fullWidth>
                Signin
              </Button>
              <p className="text-center">
                Don't have account ?{" "}
                <button className="text-blue-600 dark:text-sky-400">
                  Register
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
