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

function TodoList() {
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

  const todosJsx = todosToBeRendered.map((task) => (
    <Todo key={task.id} todo={task} />
  ));

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

  return (
    <>
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
