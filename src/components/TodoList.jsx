import { useContext, useState, useEffect, useMemo } from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Divider, Grid } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import Todo from "./Todo";
import { TodosContext } from "../contexts/todosContext";
import { v4 as uuidv4 } from "uuid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import TextField from "@mui/material/TextField";

function TodoList() {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [dialogTodo, setDialogTodo] = useState(null);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);

  const { todos, setTodos } = useContext(TodosContext);

  const [titleInput, setTitleInput] = useState("");
  const [displayedTodosType, setDisplayedTodosType] = useState("all");

  const completedTodos = useMemo(() => {
    return todos.filter((t) => {
      console.log("completed todos calling");
      return t.isCompleted;
    });
  }, [todos]);

  const notCompletedTodos = useMemo(() => {
    return todos.filter((t) => {
      console.log("NOT completed todos calling");
      return !t.isCompleted;
    });
  }, [todos]);

  let todosToBeRendered = todos;

  if (displayedTodosType == "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayedTodosType == "non-completed") {
    todosToBeRendered = notCompletedTodos;
  } else {
    todosToBeRendered = todos;
  }

  // get todos from local storage
  useEffect(() => {
    console.log("Calling");
    const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(storageTodos);
  }, []);
  const changeDisplayedType = (e) => setDisplayedTodosType(e.target.value);

  function handleAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isCompleted: false,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTitleInput("");
  }
  // handlers
  function openDeleteDialog(todo) {
    setDialogTodo(todo);
    setShowDeleteDialog(true);
  }
  const handleDeleteDialogClose = () => {
    setShowDeleteDialog(false);
  };

  const handleDeleteConfirm = () => {
    const updatedTodos = todos.filter((t) => t.id !== dialogTodo.id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    handleDeleteDialogClose();
  };

  function openUpdateDialog(todo) {
    setDialogTodo(todo);
    setShowUpdateDialog(true);
  }

  // const handleUpdateClick = () => {
  //   setUpdatedTodo({ title: todo.title, details: todo.details });
  //   setShowUpdateDialog(true);
  // };

  const handleUpdateConfirm = () => {
    const updatedTodos = todos.map((t) =>
      t.id === dialogTodo.id
        ? { ...t, title: dialogTodo.title, details: dialogTodo.details }
        : t
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    handleUpdateClose();
  };

  const handleUpdateClose = () => {
    setShowUpdateDialog(false);
  };

  const todosJsx = todosToBeRendered.map((task) => (
    <Todo
      key={task.id}
      todo={task}
      showDelete={openDeleteDialog}
      showUpdate={openUpdateDialog}
    />
  ));
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
      {/* <Dialog
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
            value={dialogTodo.title}
            onChange={(e) =>
              setDialogTodo({ ...dialogTodo, title: e.target.value })
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
            value={dialogTodo.details}
            onChange={(e) =>
              setDialogTodo({ ...dialogTodo, details: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>اغلاق</Button>
          <Button autoFocus onClick={handleUpdateConfirm}>
            تأكيد
          </Button>
        </DialogActions>
      </Dialog> */}
      {dialogTodo && (
        <Dialog
          sx={{ direction: "rtl" }}
          open={showUpdateDialog}
          onClose={handleUpdateClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle>تعديل المهمه </DialogTitle>
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
              value={dialogTodo.title}
              onChange={(e) =>
                setDialogTodo({ ...dialogTodo, title: e.target.value })
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
              value={dialogTodo.details}
              onChange={(e) =>
                setDialogTodo({ ...dialogTodo, details: e.target.value })
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
      )}

      {/* ==== UPADATE DIALOG ==== */}
      <Container maxWidth="sm">
        <Card
          sx={{ minWidth: 275, textAlign: "center" }}
          style={{
            maxHeight: "88vh",
            overflow: "scroll",
          }}
        >
          <CardContent>
            <Typography variant="h2" sx={{ fontWeight: "bold" }}>
              مهامى
            </Typography>
            <Divider />
            {/* Filter buttons */}
            <ToggleButtonGroup
              value={displayedTodosType}
              exclusive
              onChange={changeDisplayedType}
              aria-label="text alignment"
              style={{
                direction: "ltr",
                marginTop: "30px",
              }}
              color="primary"
            >
              <ToggleButton value="non-completed">غير المنجز</ToggleButton>
              <ToggleButton value="completed">المنجز</ToggleButton>
              <ToggleButton value="all">الكل</ToggleButton>
              {/* === Filter buttons === */}
            </ToggleButtonGroup>
            {/* All todos */}
            {todosJsx}
            {/* ===All todos=== */}
            {/* INPUT + ADD BUTTON */}
            <Grid container sx={{ marginTop: "20px" }} spacing={2}>
              <Grid
                size={8}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <TextField
                  id="outlined-basic"
                  label="عنوان المهمة"
                  variant="outlined"
                  sx={{ width: "100%" }}
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                />
              </Grid>
              <Grid
                size={4}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <Button
                  variant="contained"
                  sx={{ width: 1, height: 1 }}
                  onClick={handleAddClick}
                  disabled={titleInput.length == 0}
                >
                  اضافة
                </Button>
              </Grid>
            </Grid>
            {/* === INPUT + ADD BUTTON === */}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default TodoList;
