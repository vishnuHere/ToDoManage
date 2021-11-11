import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/DeleteForeverRounded";
import UpdateIcon from "@mui/icons-material/UpdateSharp";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TableIcon from "@mui/icons-material/TableViewOutlined";
import CreateIcon from "@mui/icons-material/CreateTwoTone";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { history } from "../../history";
import { insertTaskList } from "../../storage";
import "./styles.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const customStyles = {
  rows: {
    style: {
      minHeight: "50px"
    }
  },
  headCells: {
    style: {
      paddingLeft: "8px",
      paddingRight: "8px",
      fontSize: "1rem",
      color: "#0e4f74",
      fontWeight: "bold",
      borderBottom: "3px solid #1b63b9"
    }
  },
  cells: {
    style: {
      paddingLeft: "8px",
      paddingRight: "8px",
      fontSize: "0.93rem"
    }
  }
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

const ToDoList = () => {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [toDoId, setToDoId] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const incomingtasks = JSON.parse(localStorage.getItem("tasks")) || [];

    setTasks(incomingtasks);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleDelete = () => {
    const remianingTasks = [...tasks];
    remianingTasks.splice(toDoId, 1);
    insertTaskList(remianingTasks);
    setTasks(remianingTasks);
    setOpen(true);
    handleModalClose();
  };

  const handleModalOpen = (id) => {
    setToDoId(id);
    setModalOpen(true);
  };

  const columns = [
    {
      name: "No.",
      center: "true",
      maxWidth: "10px",
      cell: (row, index) => index + 1
    },
    {
      name: "Task",
      center: "true",
      selector: "name"
    },
    {
      name: "Priority",
      center: "true",
      selector: "priority"
    },
    {
      name: "Status",
      center: "true",
      cell: (row) => <div className={row.status}>{row.status}</div>
    },
    {
      name: "",
      center: "true",
      cell: (row, index) => (
        <Button
          variant="contained"
          startIcon={<UpdateIcon />}
          onClick={() => history.push(`/update/${index}`)}
        >
          Update
        </Button>
      )
    },
    {
      name: "",
      center: "true",
      cell: (row, index) => (
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={() => handleModalOpen(index)}
          color="error"
        >
          Delete
        </Button>
      )
    }
  ];

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <TableIcon />
          <Typography component="div" sx={{ flexGrow: 1 }}>
            My ToDo List
          </Typography>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<CreateIcon />}
            onClick={() => history.push("/create")}
          >
            Create
          </Button>
        </Toolbar>
      </AppBar>
      <div className="table">
        <DataTable
          customStyles={customStyles}
          columns={columns}
          data={tasks}
          highlightOnHover
          pointerOnHover
          responsive
          noHeader
        />
      </div>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          ToDo has been deleted
        </Alert>
      </Snackbar>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Do you want to delete this ToDo?
          </Typography>
          <div className={"button-container"}>
            <Button variant="contained" onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="outlined" color="error" onClick={handleModalClose}>
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ToDoList;
