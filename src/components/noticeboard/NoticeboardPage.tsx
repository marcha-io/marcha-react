import { NotificationOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Empty, Flex, Space, Typography } from 'antd';
import React, { useState } from 'react';

import CreateNoticeModal from './CreateNoticeModal';
import NoticeCard from './NoticeCard';
import type { NoticeboardPageWrapperQuery$data } from './__generated__/NoticeboardPageWrapperQuery.graphql';

type Props = {
  data: NoticeboardPageWrapperQuery$data;
};

const NoticeboardPage: React.FC<Props> = ({ data }) => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const edges = data.noticesCollection?.edges ?? [];

  return (
    <div>
      <Flex justify="space-between" align="center" style={{ marginBottom: 24 }}>
        <Typography.Title level={3} style={{ margin: 0 }}>
          Noticeboard
        </Typography.Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setCreateModalOpen(true)}
        >
          Post Notice
        </Button>
      </Flex>

      {edges.length === 0 ? (
        <Empty
          image={
            <NotificationOutlined
              style={{ fontSize: 64, color: '#bfbfbf', marginTop: 32 }}
            />
          }
          description="No notices yet"
        >
          <Button type="primary" onClick={() => setCreateModalOpen(true)}>
            Post the first notice
          </Button>
        </Empty>
      ) : (
        <Space direction="vertical" size={16} style={{ width: '100%' }}>
          {edges.map((edge) => (
            <NoticeCard key={edge.node.id} fragmentRef={edge.node} />
          ))}
        </Space>
      )}

      <CreateNoticeModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
    </div>
  );
};

export default NoticeboardPage;
