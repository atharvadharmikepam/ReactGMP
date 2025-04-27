import React, { useState } from "react";
import "./MovieForm.css";

const MovieForm = ({ initialData = {}, onSubmit }) => {
  const [form, setForm] = useState({
    title: initialData.title || "",
    releaseDate: initialData.releaseDate || "",
    url: initialData.url || "",
    genre: initialData.genre || "",
    rating: initialData.rating || "",
    runtime: initialData.runtime || "",
    overview: initialData.overview || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const handleReset = () => {
    setForm({
      title: "",
      releaseDate: "",
      url: "",
      genre: "",
      rating: "",
      runtime: "",
      overview: "",
    });
  };

  return (
    <form className="movie-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>
          Title
          <input name="title" value={form.title} onChange={handleChange} />
        </label>
        <label>
          Release Date
          <input
            name="releaseDate"
            type="date"
            value={form.releaseDate}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="form-row">
        <label>
          Movie URL
          <input
            name="url"
            type="url"
            value={form.url}
            onChange={handleChange}
          />
        </label>
        <label>
          Rating
          <input name="rating" value={form.rating} onChange={handleChange} />
        </label>
      </div>

      <div className="form-row">
        <label>
          Genre
          <select name="genre" value={form.genre} onChange={handleChange}>
            <option value="">Select Genre</option>
            <option>Action</option>
            <option>Adventure</option>
            <option>Comedy</option>
            <option>Drama</option>
            <option>Horror</option>
          </select>
        </label>
        <label>
          Runtime
          <input
            name="runtime"
            value={form.runtime}
            placeholder="minutes"
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="form-row-full">
        <label>
          Overview
          <textarea
            name="overview"
            value={form.overview}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="form-actions">
        <button type="button" className="reset-btn" onClick={handleReset}>
          Reset
        </button>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </div>
    </form>
  );
};

export default MovieForm;
