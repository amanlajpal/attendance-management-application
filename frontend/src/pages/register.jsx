import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

export default function Register() {
  const handleRegister = (event) => {};
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
          <h2 className="text-center text-2xl">Register</h2>
          <form className="flex flex-col gap-10 h-full">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your Name"
                  className="px-2 py-1 border-2 border-gray-300 rounded h-full"
                ></input>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
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
                        {isHidden ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Button variant="contained" onClick={handleRegister}>
                Signup
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
