import React, { useContext } from 'react';
import logo from '../static/images/logo.png';
import avatar from '../static/images/flat-avatar.png';

import { Link, withRouter } from 'react-router-dom';

import { Menu, Input, Avatar } from 'antd';

import AppContext from '../context/AppContext';

const SubMenu = Menu.SubMenu;

const Search = Input.Search;

const HeaderDiv = (props) => {
  const { setUser, setIsAuthenticated } = useContext(AppContext);

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    props.history.push('/');
  };

  return (
    <Menu
      mode='horizontal'
      theme='dark'
      className='d-flex align-items-center custom-navigation'
    >
      <Menu.Item key='brand-logo' className='brand-logo'>
        <Link to='/dashboard'>
          <img src={logo} className='m-r-5' alt={'logo'} />
          <span>Ant Dashboard</span>
        </Link>
      </Menu.Item>
      <Menu.Item key='search' className='custom-search auto'>
        <Search onSearch={(value) => console.log(value)} />
      </Menu.Item>

      <SubMenu
        key='profile'
        title={
          <span>
            <Avatar size={24} src={avatar} />
            <span> Profile</span>
          </span>
        }
        className=''
      >
        <Menu.Item key='profile-view'>
          <Link to='/profile'>Profile</Link>
        </Menu.Item>
        <Menu.Item
          key='logout'
          onClick={() => {
            handleLogout();
          }}
        >
          Logout
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};
export default withRouter(HeaderDiv);
