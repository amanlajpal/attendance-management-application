import React from "react";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import FormDialog from "./createAttendeeFormDialog.jsx";
import axiosInstance from "../utility/axiosInstance";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateAttendanceFormDialog from "./updateAttendanceFormDialog.jsx";
import IconButton from "@mui/material/IconButton";

function ActionsCell(props) {
  return (
    <React.Fragment>
      <UpdateAttendanceFormDialog {...props} />
      <IconButton aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </React.Fragment>
  );
}

export default function Table() {
  const [rows, setRows] = React.useState([]);
  const [rowCount, setRowCount] = React.useState(0);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });
  const [date, setDate] = React.useState(dayjs(new Date()));
  const [sortModel, setSortModel] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);

  React.useEffect(() => {
    const fetcher = async () => {
      try {
        const response = await axiosInstance.get("/attendance", {
          params: {
            page: paginationModel.page,
            pageSize: paginationModel.pageSize,
            date: date.format("YYYY-MM-DD"),
          },
        });
        const totalRowsCount = response.data.data.totalRowsCount;
        setRowCount(totalRowsCount);
        setRows(response.data.data.rows);
      } catch (error) {
        alert(error.response?.data?.message || "Unable to load Attendance!");
      }
    };
    fetcher();
  }, [paginationModel, sortModel, date, refresh]);

  const columns = [
    { field: "id", headerName: "Attendance Id", flex: 1 },
    { field: "attendee_id", headerName: "Attendee Id", flex: 1 },
    { field: "attendee_name", headerName: "Name", flex: 1 },
    { field: "attendance", headerName: "Attendance", flex: 1 },
    { field: "comment", headerName: "Comment", flex: 1 },
    { field: "created_at", headerName: "Created At", flex: 1 },
    { field: "updated_at", headerName: "Marked At", flex: 1 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      renderCell: (params) => <ActionsCell {...params} setRefresh={setRefresh} />,
    },
  ];

  const handleDateFilter = (newVal) => {
    setDate(newVal);
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="w-full flex justify-end gap-5 py-2 px-2 bg-white rounded-t border-t border-r border-l border-gray-300">
          <div className="w-1/7">
            <DatePicker
              slotProps={{ textField: { size: "small" } }}
              value={date}
              onChange={handleDateFilter}
            />
          </div>
          <FormDialog />
        </div>
        <div className="h-11/12">
          <DataGrid
            getRowId={(row) => {
              return row.attendee_id;
            }}
            columnVisibilityModel={{
              id: false,
              created_at: false,
              updated_at: false,
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
            sx={{ borderTopLeftRadius: "0px", borderTopRightRadius: "0px" }}
          />
        </div>
      </LocalizationProvider>
    </>
  );
}
