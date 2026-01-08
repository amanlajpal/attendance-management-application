import React from "react";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import FormDialog from "./createAttendeeFormDialog";
import axiosInstance from "../utility/axiosInstance";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function Table() {
  const [rows, setRows] = React.useState([]);
  const [rowCount, setRowCount] = React.useState(0);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });
  const [filterModel, setFilterModel] = React.useState({ items: [] });
  const [sortModel, setSortModel] = React.useState([]);

  React.useEffect(() => {
    const fetcher = async () => {
      try {
        const response = await axiosInstance.get("/attendance", {
          params: {
            page: paginationModel.page,
            pageSize: paginationModel.pageSize,
            // sortModel,
            // filterModel,
          },
        });
        const totalRowsCount = response.data.data.totalRowsCount;
        setRowCount(totalRowsCount);
        setRows(response.data.data.rows);
        // alert(response.data.message);
      } catch (error) {
        alert(error.response?.data?.message || "Unable to load Attendance!");
      }
    };
    fetcher();
  }, [paginationModel, sortModel, filterModel]);

  const columns = [
    // { field: "id", flex: 1 },
    { field: "attendee_id", flex: 1 },
    { field: "attendee_name", flex: 1 },
    { field: "attendance", flex: 1 },
    { field: "comment", flex: 1 },
    // { field: "created_at", flex: 1 },
    // { field: "updated_at", flex: 1 },
  ];

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="w-full flex justify-end gap-5 py-2 px-2 bg-white rounded-t border-t border-r border-l border-gray-300">
          <div className="w-1/7">
            <DatePicker
              defaultValue={dayjs("2026-01-07")}
              slotProps={{ textField: { size: "small" } }}
            />
          </div>
          <FormDialog />
        </div>
        <div className="h-11/12">
          <DataGrid
            getRowId={(row) => {
              return row.attendee_id;
            }}
            columns={columns}
            rows={rows}
            rowCount={rowCount}
            pagination
            pageSizeOptions={[10, 25, 100]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10, page: 0 },
              },
            }}
            sortingMode="server"
            filterMode="server"
            paginationMode="server"
            onPaginationModelChange={setPaginationModel}
            onSortModelChange={setSortModel}
            onFilterModelChange={setFilterModel}
            sx={{ borderTopLeftRadius: "0px", borderTopRightRadius: "0px" }}
          />
        </div>
      </LocalizationProvider>
    </>
  );
}
