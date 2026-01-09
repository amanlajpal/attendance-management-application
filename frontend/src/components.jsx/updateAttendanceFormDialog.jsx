import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axiosInstance from "../utility/axiosInstance";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { DatePicker } from "@mui/x-date-pickers";

function AttendanceCell(props) {
  const { attendanceData, setAttendanceData } = props;

  const handlePresent = () => {
    setAttendanceData((prevAttendanceData) => {
      return {
        ...prevAttendanceData,
        attendance: "P",
      };
    });
  };

  const handleAbsent = () => {
    setAttendanceData((prevAttendanceData) => {
      return {
        ...prevAttendanceData,
        attendance: "A",
      };
    });
  };

  return (
    <React.Fragment>
      <div className="h-full flex gap-4 items-center">
        <Button
          variant={attendanceData.attendance == "P" ? "contained" : "text"}
          color="success"
          onClick={handlePresent}
        >
          P
        </Button>
        <Button
          variant={attendanceData.attendance == "A" ? "contained" : "text"}
          color="error"
          onClick={handleAbsent}
        >
          A
        </Button>
      </div>
    </React.Fragment>
  );
}

export default function UpdateAttendanceFormDialog(props) {
  const { row, setRefresh, date } = props;
  const [open, setOpen] = React.useState(false);
  const [attendanceData, setAttendanceData] = React.useState({
    attendance: row?.attendance,
    comment: row?.comment,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const name = formJson.name;
    const attendance = attendanceData.attendance;
    const comment = formJson.comment;

    try {
      const attendeeUpdationResponse = await axiosInstance.put(
        "/attendee/update",
        {
          id: row.attendee_id,
          name,
        }
      );
      if (row.id) {
        const attendanceUpdationResponse = await axiosInstance.put(
          "/attendance/update",
          {
            attendance,
            comment,
            attendance_id: row.id,
          }
        );
      }
      alert("Attendance updated successfully");
      setRefresh((prev) => !prev);
    } catch (error) {
      alert(error.response?.data?.message || "Attendance updation failed!");
    }
    handleClose();
  };

  return (
    <React.Fragment>
      <IconButton aria-label="edit" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Attendance</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Note: Updating Attendee Name will update it for all dates.
          </DialogContentText>
          <form
            onSubmit={handleSubmit}
            id="attendee-edit-form"
            className="mt-4"
          >
            {row.id && (
              <div className="mb-1">
                <DatePicker
                  label={"Date"}
                  slotProps={{
                    textField: { size: "small", variant: "standard" },
                  }}
                  value={date}
                />
              </div>
            )}
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Attendee Name"
              type="text"
              fullWidth
              variant="standard"
              defaultValue={row?.attendee_name}
            />
            {row.id && (
              <>
                <div className="flex flex-col gap-2 text-[#00000099] text-sm">
                  <p>Attendance</p>
                  <AttendanceCell
                    {...props}
                    attendanceData={attendanceData}
                    setAttendanceData={setAttendanceData}
                  />
                </div>
                <TextField
                  autoFocus
                  margin="dense"
                  id="comment"
                  name="comment"
                  label="Comment"
                  type="text"
                  fullWidth
                  variant="standard"
                  defaultValue={attendanceData?.comment}
                />
              </>
            )}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="attendee-edit-form">
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
