import { Card, Col, Flex, Form, Input, Row, Typography } from 'antd';
import React, { useState } from 'react';

import { BORDER } from '../..';
import ProfileFormButtons from './ProfileFormButtons';

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
          <ProfileFormButtons
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            isMutating={isMutating}
            form={form}
          />
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
      </Form>
    </Card>
  );
};

export default ProfileForm;
