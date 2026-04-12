import {
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  message,
} from 'antd';
import React, { useEffect } from 'react';
import { useMutation } from 'react-relay';

import { CONDITIONS } from './constants';
import UpdateProductMutation from './graphql/UpdateProductMutation.graphql';
import type { UpdateProductMutationMutation } from './graphql/__generated__/UpdateProductMutationMutation.graphql';

type Category = {
  id: string;
  name: string;
};

export type ListingData = {
  id: string;
  name: string;
  description: string;
  price: number;
  condition: string | null;
  categoryId: string | null;
};

type EditListingModalProps = {
  open: boolean;
  listing: ListingData | null;
  categories: Category[];
  onClose: () => void;
  onSuccess: () => void;
};

const EditListingModal: React.FC<EditListingModalProps> = ({
  open,
  listing,
  categories,
  onClose,
  onSuccess,
}) => {
  const [form] = Form.useForm();

  const [commitMutation, isMutating] =
    useMutation<UpdateProductMutationMutation>(UpdateProductMutation);

  useEffect(() => {
    if (listing && open) {
      form.setFieldsValue({
        name: listing.name,
        description: listing.description,
        price: listing.price,
        condition: listing.condition,
        categoryId: listing.categoryId,
      });
    }
  }, [listing, open, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (!listing) return;

      commitMutation({
        variables: {
          set: {
            name: values.name,
            description: values.description,
            price: values.price,
            condition: values.condition as 'New' | 'Like_new' | 'Good' | 'Used',
            categoryId: values.categoryId || null,
          },
          filter: { id: { eq: listing.id } },
          atMost: 1,
        },
        onCompleted: () => {
          message.success('Listing updated successfully!');
          onSuccess();
          onClose();
        },
        onError: (err) => {
          message.error(`Failed to update listing: ${err.message}`);
        },
      });
    });
  };

  return (
    <Modal
      title="Edit Listing"
      open={open}
      onOk={handleOk}
      onCancel={onClose}
      confirmLoading={isMutating}
      okText="Save Changes"
      width={600}
    >
      <Form form={form} layout="vertical" requiredMark="optional">
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
          <Input.TextArea rows={4} placeholder="Describe your item" />
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
              <Select
                placeholder="Select condition"
                options={[...CONDITIONS]}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default EditListingModal;
