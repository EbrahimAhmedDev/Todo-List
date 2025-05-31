import { useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { TodosContext } from "../contexts/todosContext";
import { useToast } from "../contexts/ToastContext";

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

const Todo = ({ todo, showDelete, showUpdate }) => {
  //context
  const { todos, setTodos } = useContext(TodosContext);
  const { showHideToast } = useToast();

  // event handlers

  const handleCheckClick = (todoId) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    showHideToast("تم التحديث بنجاح");
  };

  const handleDeleteClick = () => {
    showDelete(todo);
  };

  const handleUpdateClick = () => {
    showUpdate(todo);
  };

  return (
    <>
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
