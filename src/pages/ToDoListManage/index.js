import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ArrowBack from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import { updateList } from "../../storage";
import "./styles.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ToDoListManage = ({ history, match }) => {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [age, setAge] = React.useState("Low");

  useEffect(() => {
    JSON.parse(localStorage.getItem(id));
  }, []);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTaskCreate = () => {};

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => history.goBack()}
          >
            <ArrowBack />
          </IconButton>
          <Typography component="div" sx={{ flexGrow: 1 }}>
            Create Task
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="container">
        <TextField
          id="outlined-basic"
          label="Enter Task Name"
          variant="outlined"
        />
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={age}
          onChange={handleChange}
          label="Priority"
        >
          <MenuItem value={"Low"}>Low</MenuItem>
          <MenuItem value={"Medium"}>Medium</MenuItem>
          <MenuItem value={"High"}>High</MenuItem>
        </Select>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add
        </Button>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ToDoListManage;
