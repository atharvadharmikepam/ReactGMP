import React from "react";
import { Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage/HomePage";
import AddMovieForm from "./components/AddMovieForm/AddMovieForm";
import EditMovieForm from "./components/EditMovieForm/EditMovieForm";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}>
        <Route path="new" element={<AddMovieForm />} />
      </Route>
      <Route path="/movie/:movieId" element={<HomePage />}>
        <Route path="edit" element={<EditMovieForm />} />
      </Route>
    </Routes>
  );
};

export default App;