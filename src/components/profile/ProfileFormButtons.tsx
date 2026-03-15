import { EditOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import { FormInstance } from 'antd/es/form';

import { BRAND_COLOR } from '../..';

type Props = {
  form: FormInstance;
  isMutating: boolean;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
};

const ProfileFormButtons = ({
  form,
  isMutating,
  isEditing,
  setIsEditing,
}: Props) => {
  return isEditing ? (
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
        type={'primary'}
        onClick={() => form.submit()}
        loading={isMutating}
        style={{ backgroundColor: BRAND_COLOR, borderColor: BRAND_COLOR }}
      >
        Save
      </Button>
    </Flex>
  ) : (
    <Button
      type={'default'}
      icon={<EditOutlined />}
      onClick={() => setIsEditing(true)}
      loading={isMutating}
    >
      Edit
    </Button>
  );
};

export default ProfileFormButtons;
