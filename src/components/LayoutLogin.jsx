import React from 'react';
import { Layout } from 'antd';

const LayoutLogin = (props) => {
  return (
    <Layout>
      <div className={`${props.className}`}>{props.children}</div>
    </Layout>
  );
};
export default LayoutLogin;
