import { useEffect, FC } from 'react';
import Router from 'next/router';
import { isAuth } from '../../actions/auth';

const Admin: FC = ({ children }) => {
  useEffect(() => {
    if (!isAuth()) {
      Router.push('/signin');
    } else if (isAuth().role !== 1) {
      Router.push('/');
    }
  }, []);
  return <>{children}</>;
};

export default Admin;
