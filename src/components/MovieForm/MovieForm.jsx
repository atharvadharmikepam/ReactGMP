import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './MovieForm.css';

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  release_date: Yup.date().required('Release date is required'),
  poster_path: Yup.string().url('Must be a valid URL').required('Poster URL is required'),
  genres: Yup.array().min(1, 'Select at least one genre').required('Genre is required'),
  runtime: Yup.number().positive('Must be positive').required('Runtime is required'),
  overview: Yup.string().required('Overview is required'),
});

const MovieForm = ({ initialData, onSubmit }) => {
  const initialValues = initialData || {
    title: '',
    release_date: '',
    poster_path: '',
    genres: [],
    runtime: '',
    overview: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="movie-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <Field type="text" id="title" name="title" />
            <ErrorMessage name="title" component="div" className="error" />
          </div>

          <div className="form-group">
            <label htmlFor="release_date">Release Date</label>
            <Field type="date" id="release_date" name="release_date" />
            <ErrorMessage name="release_date" component="div" className="error" />
          </div>

          <div className="form-group">
            <label htmlFor="poster_path">Movie URL</label>
            <Field type="url" id="poster_path" name="poster_path" />
            <ErrorMessage name="poster_path" component="div" className="error" />
          </div>

          <div className="form-group">
            <label htmlFor="genres">Genre</label>
            <Field as="select" id="genres" name="genres" multiple>
              <option value="Documentary">Documentary</option>
              <option value="Comedy">Comedy</option>
              <option value="Horror">Horror</option>
              <option value="Crime">Crime</option>
            </Field>
            <ErrorMessage name="genres" component="div" className="error" />
          </div>

          <div className="form-group">
            <label htmlFor="runtime">Runtime</label>
            <Field type="number" id="runtime" name="runtime" />
            <ErrorMessage name="runtime" component="div" className="error" />
          </div>

          <div className="form-group">
            <label htmlFor="overview">Overview</label>
            <Field as="textarea" id="overview" name="overview" />
            <ErrorMessage name="overview" component="div" className="error" />
          </div>

          <div className="form-actions">
            <button type="reset">Reset</button>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MovieForm;