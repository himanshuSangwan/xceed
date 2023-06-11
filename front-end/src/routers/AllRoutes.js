import React, { useState, useEffect, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DefaultLayout from "../containers/DefaultLayout";
import HomePage from "../pages/home/HomePage";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import { GlobalContext } from "../context/GlobalContext";
import LessonList from "../pages/lesson/LessonList";
import Lesson from "../pages/lesson/Lesson";
// import NotFound from "../pages/notFound/NotFound";

function AllRoutes() {
  const globalCtx = useContext(GlobalContext);
  const [isAuthentiCated, setIsAuthentiCated] = globalCtx.auth;
  const [user, setUser] = globalCtx.user;
  return isAuthentiCated ? (
    <DefaultLayout>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/dashboard" element={<HomePage />} />
        <Route exact path="/lesson/:class_id/:subject_id" element={<LessonList />} />
        <Route exact path="/lessondetail/:lesson_id" element={<Lesson />} />
        {/* <Route path="*" element={<Navigate to="/notfound" />} /> */}
      </Routes>
    </DefaultLayout>
  ) : (
    <DefaultLayout>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/dashboard" element={<HomePage />} />
        <Route exact path="/lesson/:class_id/:subject_id" element={<LessonList />} />
        <Route exact path="/lessondetail/:lesson_id" element={<Lesson />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </DefaultLayout>
  );
}
export default AllRoutes;
