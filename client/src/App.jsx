import React from "react";
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router";
import {
  Home,
  Register,
  Login,
  Dashboard,
  NotFound,
  Profile,
  ProjectForm,
  Task,
} from "./pages";
import { GuestRoute, ProtectedRoute } from "./components";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        {/* <Route path="about" element={<About />} /> */}
        <Route element={<GuestRoute />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/project/create" element={<ProjectForm />} />
          <Route path="/tasks/:projectId" element={<Task />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
