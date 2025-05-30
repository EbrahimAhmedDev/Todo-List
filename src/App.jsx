import React, { useState } from "react";
import TodoList from "./components/TodoList";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { TodosContext } from "./contexts/todosContext";

// others
// import { v4 as uuidv4 } from "uuid";

const theme = createTheme({
  typography: {
    fontFamily: "Alex",
  },
  palette: {
    primary: {
      main: "#004d40",
    },
  },
});

// const initialTodos = [
//   {
//     id: uuidv4(),
//     title: "المهمة الأولى",
//     details:
//       "يجب أن تكون المهمة الأولى من متكاملة وتدعم مستوى التعليمات المتعلقة بها.",
//     isCompleted: false,
//   },
//   {
//     id: uuidv4(),
//     title: "مهمة جديدة",
//     details: "تحتوي هذه المهمة على تعليمات ديدة.",
//     isCompleted: false,
//   },
//   {
//     id: uuidv4(),
//     title: "مهمة متكررة",
//     details: "يجب أن تكون هذه المهمة متكررة عدة مرات.",
//     isCompleted: false,
//   },
// ];
const App = () => {
  const [todos, setTodos] = useState([]);

  return (
    <ThemeProvider theme={theme}>
      <div
        className="app"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#191b1f",
          height: "100vh",
          direction: "rtl",
        }}
      >
        <TodosContext.Provider value={{ todos, setTodos }}>
          <TodoList />
        </TodosContext.Provider>
      </div>
    </ThemeProvider>
  );
};

export default App;