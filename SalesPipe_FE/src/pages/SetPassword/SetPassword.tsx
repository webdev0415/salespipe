import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Input, Typography, message } from 'antd';
import { Link, Redirect, useParams } from 'react-router-dom';
import {
  asyncSetPassword,
  AuthLoadingId,
  TOKEN_EMAIL
} from 'redux/auth/auth-slice';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { RootState } from 'redux/rootReducer';

const { Title } = Typography;

import './SetPassword.less';
import { AuthenticationService } from 'services/AuthenticationService';
type QuizParams = {
  code: string;
};

export const SetPassword: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { code } = useParams<QuizParams>();

  const [resetPwd, setResetPwd] = useState(false);

  const { loading, setPwdSuccess } = useSelector(
    (state: RootState) => state.auth
  );
  const handleSignIn = async (values: any) => {
    const email = localStorage.getItem(TOKEN_EMAIL);
    const password = values.password;

    if (
      email !== null &&
      email !== undefined &&
      password !== null &&
      password !== undefined
    ) {
      if (code) {
        const res = await AuthenticationService.forgotPasswordChange(
          email,
          password,
          code
        );

        if (!res.error) {
          message.success('Password changed');
          setResetPwd(true);
        } else {
          message.error('Error during action');
        }
      } else {
        dispatch(asyncSetPassword({ email, password }));
      }
    }
  };

  return (
    <div className="set-password-page">
      <Card className="form-card-wrapper">
        <Title className="title" level={4}>
          Set Password
        </Title>
        <Form
          layout="vertical"
          name="basic"
          onFinish={handleSignIn}
          autoComplete="off">
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please input your password' },
              { min: 9, message: 'Password must be minimum 9 characters.' }
            ]}
            hasFeedback>
            <Input.Password
              disabled={loading.includes(AuthLoadingId.SET_PASSWORD)}
              size="large"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            name="password-confirm"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!'
                    )
                  );
                }
              })
            ]}
            hasFeedback>
            <Input.Password
              disabled={loading.includes(AuthLoadingId.SET_PASSWORD)}
              size="large"
              placeholder="Confirm Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              loading={loading.includes(AuthLoadingId.SET_PASSWORD)}
              size="large"
              type="primary"
              htmlType="submit"
              style={{ width: '100%' }}>
              Set Password
            </Button>
          </Form.Item>
        </Form>
        {setPwdSuccess && <Redirect to="/join-us" exact />}
        {resetPwd && <Redirect to="/sign-in" exact />}
      </Card>
    </div>
  );
};
