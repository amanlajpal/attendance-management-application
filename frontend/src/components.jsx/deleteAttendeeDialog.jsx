import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axiosInstance from "../utility/axiosInstance";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { DatePicker } from "@mui/x-date-pickers";

export default function DeleteAttendanceFormDialog(props) {
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

    try {
      const attendeeDeleteResponse = await axiosInstance.delete(
        `/attendee/${row.attendee_id}`
      );
      alert("Attendee deleted successfully");
      setRefresh((prev) => !prev);
    } catch (error) {
      alert(error.response?.data?.message || "Attendee deletion failed!");
    }
    handleClose();
  };

  return (
    <React.Fragment>
      <IconButton aria-label="delete" onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Attendee</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete Attendee named {" "}
            <b className="mr-1">{row.attendee_name}</b>
            for all dates?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
