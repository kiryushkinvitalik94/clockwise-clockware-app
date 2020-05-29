import React, {
  FC, FormEvent, useState, ChangeEvent, useEffect,
} from 'react';
import Router from 'next/router';
import { signup, isAuth } from '../../actions/auth';

const SignupComponents: FC = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: false,
    loading: false,
    message: '',
    showForm: true,
  });

  useEffect(() => {
    isAuth() && Router.push('/');
  }, []);

  const {
    name, email, password, error, loading, message, showForm,
  } = values;

  const handleSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false });
    const user = { name, email, password };

    signup(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: '',
          password: '',
          email: '',
          error: false,
          loading: false,
          message: data.message,
          showForm: false,
        });
      }
    });
  };

  const handleChange = (inputName: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, error: false, [inputName]: e.target.value });
  };

  const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '');
  const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');
  const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '');

  const signupForm: FC = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          value={name}
          onChange={handleChange('name')}
          className="form-control"
          placeholder="Type your name"
        />
      </div>

      <div className="form-group">
        <input
          type="email"
          value={email}
          onChange={handleChange('email')}
          className="form-control"
          placeholder="Type your email"
        />
      </div>

      <div className="form-group">
        <input
          type="password"
          value={password}
          onChange={handleChange('password')}
          className="form-control"
          placeholder="Type your password"
        />
      </div>

      <div>
        <button type="submit" className="btn btn-primary">
          Signup
        </button>
      </div>
    </form>
  );
  return (
    <>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && signupForm()}
    </>
  );
};

export default SignupComponents;
