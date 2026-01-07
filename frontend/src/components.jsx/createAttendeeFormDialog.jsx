import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axiosInstance from "../utility/axiosInstance";

export default function FormDialog() {
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

    try {
      const response = await axiosInstance.post("/attendee/create", {
        name,
      });
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Attendee creation failed!");
    }
    handleClose();
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create Attendee
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Attendee</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add new attendee, please enter name of attendee here and press
            Add.
          </DialogContentText>
          <form onSubmit={handleSubmit} id="attendee-create-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="name"
              type="text"
              fullWidth
              variant="standard"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="attendee-create-form">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
