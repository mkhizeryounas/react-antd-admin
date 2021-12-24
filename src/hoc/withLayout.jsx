import React from 'react';
import Layout from '../components/Layouts';

const withLayout = (WrappedComponent) => {
  return (props) => {
    return (
      <Layout>
        <WrappedComponent {...props} />
      </Layout>
    );
  };
};

export default withLayout;
