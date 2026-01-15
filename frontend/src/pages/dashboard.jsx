import HowToRegIcon from "@mui/icons-material/HowToReg";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Table from "../components.jsx/table";
import { useAuth } from "../hooks/useAuth";

export default function Dashboard() {
  const { logout, user } = useAuth();

  return (
    <div className="bg-gray-100 h-screen w-full">
      <div className="h-full flex">
        <div className="w-1/5 h-full bg-white px-5 py-5 flex flex-col justify-between">
          <div>
            <div className="w-full h-25 flex justify-center items-center bg-purple-50 rounded hover:bg-purple-100">
              <h1 className="text-center font-bold">Attendance Management Application</h1>
            </div>
            <div className="w-full h-10 hover:bg-gray-300 bg-gray-200 rounded-xl px-2 py-1 my-5 flex items-center justify-left gap-5">
              <HowToRegIcon />
              <p className="text-sm">Attendance</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-full h-10 rounded-xl px-2 py-1 flex items-center justify-left gap-5 hover:bg-gray-200">
              <AccountCircleIcon />
              Hi {user?.name || "User"}
            </div>
            <button
              onClick={logout}
              className="w-full h-10 hover:bg-rose-200 active:bg-rose-300 rounded-xl px-2 py-1 flex items-center justify-left gap-5"
            >
              <LogoutIcon />
              Logout
            </button>
          </div>
        </div>
        <div className="w-4/5 h-full p-1">
          <Table />
        </div>
      </div>
    </div>
  );
}
