import React from 'react';
import { Modal, Form, Input, Button, Typography } from 'antd';

const { Text } = Typography;

export default function LoginRegisterModal({ visible, onCancel, onLogin }) {
  return (
    <Modal
      title="Sign in"
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form layout="vertical" onFinish={onLogin}>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, type: 'email', message: 'Please enter a valid email!' }]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please enter your password!' }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form.Item>
        <Text type="secondary" style={{ display: 'block', textAlign: 'center' }}>
          Don't have an account? <a href="#">Register here</a>
        </Text>
      </Form>
    </Modal>
  );
}
