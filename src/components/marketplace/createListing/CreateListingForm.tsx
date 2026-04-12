import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Upload,
} from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import React from 'react';

import { CONDITIONS } from '../constants';

type Category = {
  id: string;
  name: string;
};

export type ListingFormValues = {
  name: string;
  description: string;
  price: number;
  categoryId: string;
  condition: string;
};

type CreateListingFormProps = {
  categories: Category[];
  fileList: UploadFile[];
  onFileListChange: (fileList: UploadFile[]) => void;
  onSubmit: (values: ListingFormValues) => void;
  submitting: boolean;
  uploading: boolean;
};

const MAX_IMAGES = 5;

/**
 * The listing creation form with title, description, price, category,
 * condition, and multi-photo upload fields.
 */
const CreateListingForm: React.FC<CreateListingFormProps> = ({
  categories,
  fileList,
  onFileListChange,
  onSubmit,
  submitting,
  uploading,
}) => {
  const [form] = Form.useForm<ListingFormValues>();

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSubmit}
      requiredMark="optional"
    >
      <Form.Item
        name="name"
        label="Title"
        rules={[
          { required: true, message: 'Please enter a title' },
          { max: 100, message: 'Title must be 100 characters or less' },
        ]}
      >
        <Input placeholder="What are you selling?" />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: 'Please enter a description' }]}
      >
        <Input.TextArea
          rows={4}
          placeholder="Describe your item, including any details buyers should know"
        />
      </Form.Item>

      <Row gutter={16}>
        <Col xs={24} sm={8}>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please enter a price' }]}
          >
            <InputNumber
              prefix="£"
              min={0}
              step={0.01}
              precision={2}
              style={{ width: '100%' }}
              placeholder="0.00"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={8}>
          <Form.Item name="categoryId" label="Category">
            <Select
              placeholder="Select category"
              allowClear
              options={categories.map((c) => ({
                label: c.name,
                value: c.id,
              }))}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={8}>
          <Form.Item
            name="condition"
            label="Condition"
            rules={[{ required: true, message: 'Please select condition' }]}
          >
            <Select placeholder="Select condition" options={[...CONDITIONS]} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label={`Photos (up to ${MAX_IMAGES})`}
        extra="First photo will be the cover image"
      >
        <Upload
          listType="picture-card"
          maxCount={MAX_IMAGES}
          multiple
          fileList={fileList}
          onChange={({ fileList: newFileList }) =>
            onFileListChange(newFileList)
          }
          beforeUpload={() => false}
          accept="image/*"
        >
          {fileList.length < MAX_IMAGES && (
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          )}
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          loading={uploading || submitting}
          style={{ width: '100%' }}
        >
          {uploading ? 'Uploading images...' : 'Create Listing'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateListingForm;
