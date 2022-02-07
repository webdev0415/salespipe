import React, { useCallback } from 'react';
import { Button, Card, Form, Input, Typography } from 'antd';
import { Link, Redirect } from 'react-router-dom';
const { Title } = Typography;

import './SignIn.less';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/rootReducer';
import { asyncLogin, AuthLoadingId } from 'redux/auth/auth-slice';
import { Roles } from 'app/App';

export const SignIn: React.FC = () => {
  const { loading, loginSuccess, roles } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();

  const handleSignIn = async (values: any): Promise<void> => {
    dispatch(asyncLogin(values));
  };
  const specificLoading = loading.includes(AuthLoadingId.SIGN_IN);
  const redirectLogic = useCallback(() => {
    if (loginSuccess) {
      if (roles) {
        if (roles.some((r) => r === Roles.SDR)) {
          return <Redirect to="/profile" push />;
        } else if (roles.some((r) => r === Roles.ADMIN)) {
          return <Redirect to="/admin/users" push />;
        } else if (roles.some((r) => r === Roles.HIRER)) {
          return <Redirect to="/users" push />;
        } else if (roles.some((r) => r === Roles.NOROLE)) {
          return <Redirect to="/join-us" push />;
        }
      }
    }
  }, [roles, loginSuccess]);

  return (
    <div className="sign-in-page">
      <Card className="form-card-wrapper">
        <Title className="title" level={4}>
          Sign in to SalesPipe
        </Title>
        <Form
          layout="vertical"
          name="basic"
          onFinish={handleSignIn}
          autoComplete="off">
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Please input your email'
              }
            ]}>
            <Input
              disabled={specificLoading}
              size="large"
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password' }]}>
            <Input.Password
              disabled={specificLoading}
              size="large"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              loading={specificLoading}
              size="large"
              type="primary"
              htmlType="submit"
              style={{ width: '100%' }}>
              SIGN IN
            </Button>
          </Form.Item>
          <Typography className="privacy-text">
            Read our <a href="/">Term of use</a> and{' '}
            <a href="/">Privacy policy</a>
          </Typography>
        </Form>
      </Card>
      <Link className="reset-password" to="/reset-password">
        Reset your password
      </Link>

      {redirectLogic()}
    </div>
  );
};
