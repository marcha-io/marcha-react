import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Flex, Form, Input, Typography } from 'antd';
import { Header } from 'antd/es/layout/layout';

type TSignInForm = {
  username?: string;
  password?: string;
  remember?: boolean;
};

const SignIn = (): React.ReactElement => {
  const onFinish = (form: TSignInForm) => {
    console.log('Finished', form);
  };
  return (
    <Flex gap={24} wrap="wrap" align="center" justify="center" vertical>
      <Header>
        <Typography.Title>Sign In</Typography.Title>{' '}
      </Header>
      <Form
        size="large"
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your Username or Email',
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username or Email" />
        </Form.Item>
        <Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
            style={{ marginBottom: 0 }}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <a href="">Forgot password</a>
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Log in
          </Button>
          or <a href="">Register now!</a>
        </Form.Item>
      </Form>{' '}
    </Flex>
  );
};

export default SignIn;
