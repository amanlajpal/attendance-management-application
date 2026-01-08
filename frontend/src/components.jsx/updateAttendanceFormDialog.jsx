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

export default function UpdateAttendanceFormDialog(props) {
  const { row, setRefresh } = props;
  const [open, setOpen] = React.useState(false);

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
    const attendance = formJson.attendance;
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
            attendee_id: row.attendee_id,
            attendance,
            comment,
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
          <form onSubmit={handleSubmit} id="attendee-edit-form">
            <TextField
              autoFocus
              // required
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
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="attendance"
                  name="attendance"
                  label="Attendance"
                  type="text"
                  fullWidth
                  variant="standard"
                  defaultValue={row?.attendance}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="comment"
                  name="comment"
                  label="Comment"
                  type="text"
                  fullWidth
                  variant="standard"
                  defaultValue={row?.comment}
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
