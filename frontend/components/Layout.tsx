import React, { FC, ReactNode } from 'react';
import Header from './Header';

type propTypes = {
  children?: ReactNode;
};

const Layout: FC = ({ children }: propTypes) => (
  <>
    <Header />
    {children}
  </>
);

export default Layout;
