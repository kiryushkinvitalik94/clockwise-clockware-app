import {
  useState, FC, FormEvent, ChangeEvent, useEffect,
} from 'react';
import Router from 'next/router';
import { signin, authenticate, isAuth } from '../../actions/auth';

const SigninComponent: FC = () => {
  const [values, setValues] = useState({
    email: 'admin@example.com',
    password: 'passwordsecret',
    error: false,
    loading: false,
    message: '',
    showForm: true,
  });

  useEffect(() => {
    console.log(isAuth());
    isAuth() && Router.push('/');
  }, []);

  const {
    email, password, error, loading, message, showForm,
  } = values;

  const handleSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    // console.table({ name, email, password, error, loading, message, showForm });
    setValues({ ...values, loading: true, error: false });
    const user = { email, password };

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        // save user token to cookie
        // save user info to localstorage
        // authenticate user
        authenticate(data, () => {
          if (isAuth() && isAuth().role === 1) {
            Router.push('/admin');
          } else {
            Router.push('/user');
          }
        });
      }
    });
  };

  const handleChange = (inputName: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, error: false, [inputName]: e.target.value });
  };

  const showLoading: FC = () => (loading ? <div className="alert alert-info">Loading...</div> : '');
  const showError: FC = () => (error ? <div className="alert alert-danger">{error}</div> : '');
  const showMessage: FC = () => (message ? <div className="alert alert-info">{message}</div> : '');

  const signinForm: FC = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          value={email}
          onChange={handleChange('email')}
          type="email"
          className="form-control"
          placeholder="Type your email"
        />
      </div>

      <div className="form-group">
        <input
          value={password}
          onChange={handleChange('password')}
          type="password"
          className="form-control"
          placeholder="Type your password"
        />
      </div>

      <div>
        <button className="btn btn-primary">Signin</button>
      </div>
    </form>
  );

  return (
    <>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && signinForm()}
    </>
  );
};

export default SigninComponent;
