import React, { useState } from 'react';
import { Button, Card, Form, Input, Typography } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { asyncSignupPrepare, AuthLoadingId } from 'redux/auth/auth-slice';
import './SignUp.less';
import { CheckCircleOutlined } from '@ant-design/icons';
import { RootState } from 'redux/rootReducer';

const { Title } = Typography;

interface FormInput {
  email: string;
}
export const SignUp: React.FC = () => {
  const { loading, prepareSuccess } = useSelector(
    (state: RootState) => state.auth
  );

  const dispatch = useDispatch();

  const handleSignUp = (values: FormInput): void => {
    const { email } = values;

    dispatch(asyncSignupPrepare({ email }));
  };

  return (
    <div className="sign-up-page">
      {!prepareSuccess && (
        <Card className="form-card-wrapper">
          <Title className="title" level={4}>
            Sign up with SalesPipe
          </Title>
          <Form
            layout="vertical"
            name="basic"
            onFinish={handleSignUp}
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
                disabled={loading.includes(AuthLoadingId.SIGNUP_PREPARE)}
                size="large"
                placeholder="Email"
              />
            </Form.Item>

            <Form.Item>
              <Button
                loading={loading.includes(AuthLoadingId.SIGNUP_PREPARE)}
                size="large"
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}>
                SIGN UP
              </Button>
            </Form.Item>
            <Typography className="privacy-text">
              By signing up you are agree to our <a href="/">privacy policy</a>
            </Typography>
          </Form>
        </Card>
      )}

      {prepareSuccess && (
        <Card className="message-card-wrapper">
          <CheckCircleOutlined className="message-icon" />
          <Typography className="message-text">
            Check your email for a link to complete sign up
          </Typography>
        </Card>
      )}
    </div>
  );
};
