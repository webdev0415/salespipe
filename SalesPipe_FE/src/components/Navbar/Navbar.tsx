import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

import './Navbar.less';
import Logo from 'common/assets/logo.png';
import { TOKEN_EMAIL, TOKEN_KEY, TOKEN_ROLES } from 'redux/auth/auth-slice';
import { RootState } from 'redux/rootReducer';
import { useSelector } from 'react-redux';

const { Header } = Layout;

type Props = {
  localLoginSuccess: boolean;
};

export const Navbar: React.FC<Props> = ({ localLoginSuccess }: Props) => {
  const { email, roles } = useSelector((state: RootState) => state.auth);

  const navItems = [
    {
      label: 'Sign up',
      to: '/sign-up'
    },
    {
      label: 'Sign in',
      to: '/sign-in'
    }
  ];
  const signOut = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_ROLES);
    localStorage.removeItem(TOKEN_EMAIL);
    document.location.href = '/sign-in';
  };

  return (
    <Header className="header">
      <img src={Logo} alt="header logo" className="logo" />

      <Menu theme="dark" mode="horizontal">
        {localLoginSuccess ? (
          <>
            <span>
              {email} {!roles?.includes('NOROLE') && `/ ${roles}`}
            </span>
            <div style={{ display: 'flex', marginLeft: 'auto' }}>
              <Link to={'/change-password'} style={{ marginRight: '15px' }}>
                Change Password
              </Link>
              <Link onClick={signOut} to={'/sign-in'}>
                SignOut
              </Link>
            </div>
          </>
        ) : (
          navItems.map((item, i) => {
            return (
              <Menu.Item key={i}>
                <Link to={item.to}>{item.label}</Link>
              </Menu.Item>
            );
          })
        )}
      </Menu>
    </Header>
  );
};
