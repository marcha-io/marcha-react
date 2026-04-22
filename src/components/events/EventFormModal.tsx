import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Switch,
  Tooltip,
} from 'antd';
import { FormInstance } from 'antd/es/form';

type Props = {
  form: FormInstance;
  onSubmit: () => void;
  onCloseModal: () => void;
  isModalOpen: boolean;
  isLoading: boolean;
  isPinnedToggleShowned?: boolean;
  title: string;
  submitLabel: string;
};

const EventFormModal: React.FC<Props> = ({
  form,
  isModalOpen,
  onSubmit,
  onCloseModal,
  isLoading,
  isPinnedToggleShowned,
  title,
  submitLabel,
}) => {
  return (
    <Modal
      title={title}
      open={isModalOpen}
      onOk={onSubmit}
      onCancel={onCloseModal}
      confirmLoading={isLoading}
      okText={submitLabel}
      destroyOnHidden
    >
      <Form form={form} layout="vertical" preserve={false}>
        <Form.Item
          name="title"
          label="Event Title"
          rules={[{ required: true, message: 'Please enter an event title' }]}
        >
          <Input placeholder="e.g. Community BBQ" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea rows={3} placeholder="Describe the event..." />
        </Form.Item>
        <Form.Item
          name="eventDate"
          label="Date & Time"
          rules={[{ required: true, message: 'Please select a date and time' }]}
        >
          <DatePicker
            showTime
            format="DD/MM/YYYY HH:mm"
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item name="location" label="Location">
          <Input placeholder="e.g. Building courtyard" />
        </Form.Item>
        <Form.Item name="imageUrl" label="Image URL">
          <Input placeholder="https://example.com/image.jpg" />
        </Form.Item>
        <Form.Item name="maxAttendees" label="Max Attendees">
          <InputNumber
            min={1}
            placeholder="Leave empty for unlimited"
            style={{ width: '100%' }}
          />
        </Form.Item>

        {isPinnedToggleShowned && (
          <Form.Item
            name="pinned"
            label="Pin this event"
            valuePropName="checked"
            initialValue={false}
          >
            <Tooltip title="Pinned events appear at the top of the events page">
              <Switch />
            </Tooltip>
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default EventFormModal;
