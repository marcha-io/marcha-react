import { CheckOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card, Col, Flex, Form, Input, Row, Typography } from 'antd';
import React, { useState } from 'react';

const BRAND_COLOR = '#F06543';
const BORDER = '#E5E7EB';

type ProfileFormValues = {
  firstName: string;
  lastName: string;
  username: string;
  description: string;
};

type ProfileFormProps = {
  initialValues: ProfileFormValues;
  isMutating: boolean;
  onSave: (values: ProfileFormValues) => void;
};

const ProfileForm: React.FC<ProfileFormProps> = ({
  initialValues,
  isMutating,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm<ProfileFormValues>();

  return (
    <Card
      style={{ borderRadius: 16, border: `1px solid ${BORDER}` }}
      title={
        <Flex justify="space-between" align="center">
          <Typography.Title level={5} style={{ margin: 0 }}>
            Profile Details
          </Typography.Title>
          <Button
            type={isEditing ? 'primary' : 'default'}
            icon={isEditing ? <CheckOutlined /> : <EditOutlined />}
            onClick={() => {
              if (isEditing) {
                form.submit();
              } else {
                setIsEditing(true);
              }
            }}
            loading={isMutating}
            style={
              isEditing
                ? { backgroundColor: BRAND_COLOR, borderColor: BRAND_COLOR }
                : {}
            }
          >
            {isEditing ? 'Save' : 'Edit'}
          </Button>
        </Flex>
      }
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={(values) => {
          onSave(values);
          setIsEditing(false);
        }}
        disabled={!isEditing}
      >
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="firstName"
              label={
                <Typography.Text strong style={{ fontSize: 13 }}>
                  First Name
                </Typography.Text>
              }
            >
              <Input
                placeholder="Enter your first name"
                size="large"
                style={{ borderRadius: 8 }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="lastName"
              label={
                <Typography.Text strong style={{ fontSize: 13 }}>
                  Last Name
                </Typography.Text>
              }
            >
              <Input
                placeholder="Enter your last name"
                size="large"
                style={{ borderRadius: 8 }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="username"
          label={
            <Typography.Text strong style={{ fontSize: 13 }}>
              Username
            </Typography.Text>
          }
        >
          <Input
            prefix={<Typography.Text type="secondary">@</Typography.Text>}
            placeholder="Choose a username"
            size="large"
            style={{ borderRadius: 8 }}
          />
        </Form.Item>

        <Form.Item
          name="description"
          label={
            <Typography.Text strong style={{ fontSize: 13 }}>
              Bio
            </Typography.Text>
          }
        >
          <Input.TextArea
            placeholder="Tell us a bit about yourself..."
            rows={4}
            maxLength={300}
            showCount
            style={{ borderRadius: 8 }}
          />
        </Form.Item>

        {isEditing && (
          <Flex justify="flex-end" gap={12} style={{ marginTop: 8 }}>
            <Button
              onClick={() => {
                setIsEditing(false);
                form.resetFields();
              }}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={isMutating}
              style={{
                backgroundColor: BRAND_COLOR,
                borderColor: BRAND_COLOR,
              }}
            >
              Save Changes
            </Button>
          </Flex>
        )}
      </Form>
    </Card>
  );
};

export default ProfileForm;
