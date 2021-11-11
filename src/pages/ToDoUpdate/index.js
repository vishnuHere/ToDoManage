import React, { useState, useEffect } from "react";
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
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { insertTaskList } from "../../storage";
import "./styles.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SUCCESS_MSG = "ToDo Updated Successfully";
const ERROR_MSG = "Name should not be empty";

const ToDoUpdate = ({ history, match }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const tasks = JSON.parse(localStorage.getItem("tasks"));

  useEffect(() => {
    setName(tasks[match.params.id]["name"]);
    setPriority(tasks[match.params.id]["priority"]);
    setStatus(tasks[match.params.id]["status"]);
  }, [match?.params]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleTaskUpdate = () => {
    const id = match.params.id;
    let msg = SUCCESS_MSG;

    if (name && name.trim()) {
      tasks.splice(id, 1);
      tasks.splice(id, 0, { name, priority, status });
      insertTaskList(tasks);
    } else {
      msg = ERROR_MSG;
    }

    setMessage(msg);
    setOpen(true);
  };

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
            Update ToDo
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="update-container">
        <TextField
          id="outlined-basic"
          label="Enter Task Name"
          variant="outlined"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <FormControl>
          <InputLabel id="demo-simple-select-standard-label">
            Priority
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            label="Pririty"
            value={priority}
            onChange={(event) => {
              setPriority(event.target.value);
            }}
          >
            <MenuItem value={"Low"}>Low</MenuItem>
            <MenuItem value={"Medium"}>Medium</MenuItem>
            <MenuItem value={"High"}>High</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="demo-simple-select-standard-label1">
            Status
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label1"
            id="demo-simple-select-standard"
            label="Status"
            value={status}
            onChange={(event) => {
              setStatus(event.target.value);
            }}
          >
            <MenuItem value={"Open"}>Open</MenuItem>
            <MenuItem value={"Inprogress"}>Inprogress</MenuItem>
            <MenuItem value={"Completed"}>Completed</MenuItem>
            <MenuItem value={"Cancelled"}>Cancelled</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" onClick={handleTaskUpdate}>
          Update
        </Button>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={name && name.trim() ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ToDoUpdate;
