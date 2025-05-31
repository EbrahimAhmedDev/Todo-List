import React, { useState } from "react";
import TodoList from "./components/TodoList";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { TodosContext } from "./contexts/todosContext";
import { ToastProvider } from "./contexts/ToastContext";

// others
// import { v4 as uuidv4 } from "uuid";
import MySnackBar from "./components/MySnackBar";

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

const App = () => {
  const [todos, setTodos] = useState([]);



  return (
    <ThemeProvider theme={theme}>
      <ToastProvider >
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
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
