import React, { useState } from 'react';
import { Button, Card, Form, Input, message, Typography } from 'antd';
const { Title } = Typography;

import './ResetPassword.less';
import { AuthenticationService } from 'services/AuthenticationService';
import { TOKEN_EMAIL } from 'redux/auth/auth-slice';

export const ResetPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const handleReset = async (values: any): Promise<void> => {
    setLoading(true);
    await AuthenticationService.resetPassword(values.email);

    localStorage.setItem(TOKEN_EMAIL, values.email);

    message.success('Email sent');
    setLoading(false);
  };

  return (
    <div className="sign-in-page">
      <Card className="form-card-wrapper">
        <Title className="title" level={4}>
          Reset your password
        </Title>
        <Form
          layout="vertical"
          name="basic"
          onFinish={handleReset}
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
            <Input disabled={loading} size="large" placeholder="Email" />
          </Form.Item>

          <Form.Item>
            <Button
              loading={loading}
              size="large"
              type="primary"
              htmlType="submit"
              style={{ width: '100%' }}>
              Reset
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
