import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../static/images/logo.png';
import LayoutLogin from '../components/LayoutLogin';
import { Form, Input, Button, Checkbox, Icon, message } from 'antd';
import axios from '../utils/axios';
import AppContext from '../context/AppContext';

const Login = (props) => {
  const { setUser, setIsAuthenticated } = useContext(AppContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values, props.login);
        try {
          const { data: user } = await axios.post('/users/signin', values);
          setUser(user);
          setIsAuthenticated(true);
          props.history.push('/');
        } catch (err) {
          console.log('Err', err);
          message.error('Invalid username or password');
        }
      }
    });
  };

  const { getFieldDecorator } = props.form;

  return (
    <LayoutLogin title='login' classname='login'>
      <div
        className='d-flex align-items-center justify-content-center flex-column'
        style={{ maxWidth: '360px', margin: 'auto', height: '100vh' }}
      >
        <div className='text-center'>
          <img src={logo} alt='logo' />
          <h1 className='m-b-30 m-t-15'>Ant Dashboard</h1>
        </div>
        <Form onSubmit={handleSubmit} className='login-form'>
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  message: 'Please input your email!',
                },
                {
                  type: 'email',
                  message: 'Invalid email address!',
                },
              ],
            })(
              <Input
                prefix={
                  <Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder='Email'
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' },
              ],
            })(
              <Input
                prefix={
                  <Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type='password'
                placeholder='Password'
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>Remember me</Checkbox>)}
            <Link className='float-right' to=''>
              Forgot password
            </Link>

            <Button
              type='primary'
              htmlType='submit'
              className='btn-block m-t-15'
              size='large'
            >
              Log in
            </Button>

            <p>
              Need an account? <Link to='/register'>Signup</Link>
            </p>
          </Form.Item>
        </Form>
      </div>
    </LayoutLogin>
  );
};

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

export default WrappedNormalLoginForm;
