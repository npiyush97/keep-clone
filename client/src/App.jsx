import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./Components/Homepage";
import TodoUiApp from "./Components/TodoAppUi";
import SignUpUi from "./Components/Signup";
import LoginUi from "./Components/LoginUi";
import PrivateRoute from "./utils/protectedRoute";
import Dashboard from "./Components/Dashboard";

function App() {
  return (
    <Routes>
      <Route element={<Homepage />} path="/" />
      <Route
        path="/todo"
        element={(
          <PrivateRoute>
            <TodoUiApp />
          </PrivateRoute>
        )}
      />
      <Route element={<SignUpUi />} path="/signup" />
      <Route element={<LoginUi />} path="/login" />
      <Route element={<Dashboard />} path="/dashboard" />
    </Routes>
  );
}

export default App;
