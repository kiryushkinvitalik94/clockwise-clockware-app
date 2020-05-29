import { FC } from 'react';
import Layout from '../components/Layout';
import SignupComponents from '../components/auth/SignupComponents';

const Signup: FC = () => (
  <Layout>
    <h2 className="text-center pt-4 pb-4">Signup</h2>
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <SignupComponents />
      </div>
    </div>
  </Layout>
);

export default Signup;
