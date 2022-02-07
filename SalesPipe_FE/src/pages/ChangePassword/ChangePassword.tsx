import React, { useState } from 'react';
import { Button, Card, Form, Input, message, Typography } from 'antd';
const { Title } = Typography;

import './ChangePassword.less';
import { AuthenticationService } from 'services/AuthenticationService';

export const ChangePassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const handleChangePassword = async (values: any): Promise<void> => {
    setLoading(true);
    const x = await AuthenticationService.changePassword({
      oldPassword: values.oldPassword,
      password: values.password
    });

    if (!x.error) {
      message.success('Password changed');
    }

    setLoading(false);
  };

  return (
    <div className="sign-in-page">
      <Card className="form-card-wrapper">
        <Title className="title" level={4}>
          Change your password
        </Title>
        <Form
          layout="vertical"
          name="basic"
          onFinish={handleChangePassword}
          autoComplete="off">
          <Form.Item
            name="oldPassword"
            rules={[{ required: true, message: 'Please input your password' }]}
            hasFeedback>
            <Input.Password size="large" placeholder="Old password" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please input your password' },
              { min: 9, message: 'Password must be minimum 9 characters.' }
            ]}
            hasFeedback>
            <Input.Password size="large" placeholder="New password" />
          </Form.Item>

          <Form.Item>
            <Button
              loading={loading}
              size="large"
              type="primary"
              htmlType="submit"
              style={{ width: '100%' }}>
              Change
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
