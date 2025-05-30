import React, { useContext, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { TodosContext } from "../contexts/todosContext";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

const customStyleForIconsBtn = (color) => {
  return {
    color: `#${color}`,
    background: `white`,
    border: `solid #${color} 3px`,
    transition: `all .2s`,
    "&:hover": {
      backgroundColor: `#c5c5c5`,
      boxShadow: "0px 7px 7px rgba(0, 0, 0, 0.4)",
    },
  };
};

const Todo = ({ todo }) => {
  //context
  const { todos, setTodos } = useContext(TodosContext);

  // state
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({ title: "", details: "" });

  // event handlers

  const handleCheckClick = (todoId) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  const handleUpdateClick = () => {
    setUpdatedTodo({ title: todo.title, details: todo.details });
    setShowUpdateDialog(true);
  };

  const handleDeleteConfirm = () => {
    const updatedTodos = todos.filter((t) => t.id !== todo.id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    handleDeleteDialogClose();
  };
  const handleUpdateConfirm = () => {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id
        ? { ...t, title: updatedTodo.title, details: updatedTodo.details }
        : t
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    handleUpdateClose();
  };

  const handleDeleteDialogClose = () => {
    setShowDeleteDialog(false);
  };
  const handleUpdateClose = () => {
    setShowUpdateDialog(false);
  };

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  return (
    <>
      {/* DELETE DIALOG */}
      <Dialog
        sx={{ direction: "rtl" }}
        open={showDeleteDialog}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          هل انت متاكد من حذف المهمه ؟؟؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكنك التراجع عن الحذف بعد اتمامه
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>اغلاق</Button>
          <Button autoFocus onClick={handleDeleteConfirm}>
            نعم قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>
      {/* ==== DELETE DIALOG ==== */}
      {/* UPADATE DIALOG */}
      <Dialog
        sx={{ direction: "rtl" }}
        open={showUpdateDialog}
        onClose={handleUpdateClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">تعديل المهمه </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="عنوان المهمه"
            fullWidth
            variant="standard"
            value={updatedTodo.title}
            onChange={(e) =>
              setUpdatedTodo({ ...updatedTodo, title: e.target.value })
            }
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="details"
            name="details"
            label="التفاصيل"
            fullWidth
            variant="standard"
            multiline
            minRows={3}
            maxRows={10}
            value={updatedTodo.details}
            onChange={(e) =>
              setUpdatedTodo({ ...updatedTodo, details: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>اغلاق</Button>
          <Button autoFocus onClick={handleUpdateConfirm}>
            تأكيد
          </Button>
        </DialogActions>
      </Dialog>
      {/* ==== UPADATE DIALOG ==== */}
      <Card
        sx={{
          minWidth: 275,
          textAlign: "center",
          background: "#283593",
          color: "white",
          marginTop: 5,
          boxShadow: "0px 7px 7px rgba(0, 0, 0, 0.4)",
          transition: "all .2s ease",
          "&:hover": {
            paddingBottom: "4px",
            paddingTop: "4px",
          },
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "right",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Typography
                variant="h6"
                sx={{ textAlign: "right", fontSize: "15px" }}
              >
                {todo.details}
              </Typography>
            </Grid>
            {/* Action buttons */}
            <Grid
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              {/* CHECK ICON BUTTON */}
              <IconButton
                sx={{
                  ...customStyleForIconsBtn("8bc348"),
                  backgroundColor: todo.isCompleted ? "#8bc348" : "white",
                  color: todo.isCompleted ? "white" : `#8bc348`,
                }}
                onClick={() => handleCheckClick(todo.id)}
              >
                <CheckIcon />
              </IconButton>
              {/* ==== CHECK ICON BUTTON ==== */}
              <IconButton
                sx={customStyleForIconsBtn("1769aa")}
                onClick={handleUpdateClick}
              >
                <EditOutlinedIcon />
              </IconButton>
              <IconButton
                sx={customStyleForIconsBtn("b23c17")}
                onClick={handleDeleteClick}
              >
                <DeleteOutlinedIcon />
              </IconButton>
              {/* ===Action buttons=== */}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default Todo;
