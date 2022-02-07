import React, { useCallback, useEffect, useState } from 'react';
import { Layout } from 'antd';
import { Route, Redirect, Switch } from 'react-router-dom';

import { InlineStylesModel } from 'models/InlineStylesModel';

import {
  JoinUsCompany,
  JoinUsSDR,
  JoinUs,
  Users,
  User,
  Profile,
  AdminUsers,
  SignUp,
  SignIn,
  ResetPassword
} from 'pages';
import SignUpConfirm from 'pages/SignUp/SignUpConfirm';
import NotFound from 'pages/NotFound/NotFound';
import { SetPassword } from 'pages/SetPassword/SetPassword';
import { Navbar } from 'components';
import { AuthenticationService } from 'services/AuthenticationService';
import { asyncGetMe } from 'redux/auth/auth-slice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/rootReducer';
import { ChangePassword } from 'pages/ChangePassword/ChangePassword';

const { Content } = Layout;

const styles: InlineStylesModel = {
  layout: {
    minHeight: '100vh'
  },
  content: {
    backgroundColor: '#ececec',
    padding: '0 3rem'
  }
};

export enum Roles {
  SDR = 'SDR',
  HIRER = 'HIRER',
  ADMIN = 'ADMIN',
  NOROLE = 'NOROLE'
}
const App: React.FC = () => {
  const { loginSuccess, roles } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();
  const fetchUser = useCallback(async () => {
    if (!loginSuccess && roles && roles.length > 0) {
      const response = await AuthenticationService.getMe();

      dispatch(asyncGetMe({ response }));
    }
  }, [dispatch, roles, loginSuccess]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const PrivateRoute = ({ component: Component, ...rest }: any) => {
    const { pRole } = rest;

    const shouldDisplay = () => {
      if (roles?.some((r) => pRole.includes(r))) return true;

      return false;
    };

    return (
      <Route
        {...rest}
        render={(props) =>
          shouldDisplay() ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: '/sign-in' }} />
          )
        }
      />
    );
  };

  return (
    <Layout style={styles.layout}>
      <Navbar localLoginSuccess={loginSuccess || false} />
      <Content style={styles.content}>
        <Switch>
          <Redirect from="/" to="/sign-in" exact />
          <PrivateRoute
            pRole={[Roles.NOROLE]}
            path="/join-us"
            exact
            component={JoinUs}
          />
          <PrivateRoute
            pRole={[Roles.NOROLE]}
            path="/join-us/company"
            exact
            component={JoinUsCompany}
          />
          <PrivateRoute
            pRole={[Roles.NOROLE]}
            path="/join-us/sdr"
            exact
            component={JoinUsSDR}
          />
          <PrivateRoute
            pRole={[Roles.HIRER]}
            path="/users"
            exact
            component={Users}
          />
          <PrivateRoute
            pRole={[Roles.HIRER, Roles.ADMIN]}
            path="/user/:id"
            exact
            component={User}
          />
          <PrivateRoute
            pRole={[Roles.SDR]}
            path="/profile"
            exact
            component={Profile}
          />
          <PrivateRoute
            pRole={[Roles.ADMIN]}
            path="/admin/users"
            exact
            component={AdminUsers}
          />
          <PrivateRoute
            pRole={[Roles.ADMIN, Roles.HIRER, Roles.SDR]}
            path="/change-password"
            exact
            component={ChangePassword}
          />
          <Route path="/sign-up" exact component={SignUp} />
          <Route path="/sign-up/:code" exact component={SignUpConfirm} />
          <Route path="/sign-in" exact component={SignIn} />
          <Route path="/set-password" exact component={SetPassword} />
          <Route path="/set-password/:code" exact component={SetPassword} />
          <Route path="/reset-password" exact component={ResetPassword} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Content>
    </Layout>
  );
};

export default App;
