import HowToRegIcon from "@mui/icons-material/HowToReg";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Table from "../components.jsx/table";
import { useAuth } from "../hooks/useAuth";

export default function Dashboard() {
  const { logout, user } = useAuth();

  return (
    <div className="bg-gray-100 h-screen w-full">
      <div className="w-full h-1/12 bg-white">
        <div className="w-full h-full flex justify-center items-center">
          <h1>Attendance Management Application</h1>
        </div>
      </div>
      <div className="h-11/12 flex">
        <div className="w-1/5 h-full bg-white px-5 py-3 flex flex-col justify-between">
          <div>
            <div className="w-full h-10 hover:bg-gray-300 bg-gray-200 rounded-xl px-2 py-1 flex items-center justify-left gap-5">
              <HowToRegIcon />
              <p className="text-sm">Attendance</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-full h-10 rounded-xl px-2 py-1 flex items-center justify-left gap-5">
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
