import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Empty, Flex, Space, Typography } from 'antd';
import React, { Suspense, useState } from 'react';

import { NEUTRAL_500 } from '../../design';
import CreateNoticeModal from './CreateNoticeModal';
import NoticeCard from './NoticeCard';
import type { NoticeboardPageWrapperQuery$data } from './__generated__/NoticeboardPageWrapperQuery.graphql';

type Props = {
  data: NoticeboardPageWrapperQuery$data;
};

const NoticeboardPage: React.FC<Props> = ({ data }) => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const notices = data.noticesCollection?.edges ?? [];

  return (
    <div>
      <Flex justify="space-between" align="center" style={{ marginBottom: 24 }}>
        <div>
          <Typography.Title level={3} style={{ margin: 0 }}>
            Noticeboard
          </Typography.Title>
          <Typography.Text style={{ color: NEUTRAL_500, fontSize: 13 }}>
            {notices.length} notice{notices.length !== 1 ? 's' : ''}
          </Typography.Text>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setCreateModalOpen(true)}
        >
          Post Notice
        </Button>
      </Flex>

      {notices.length === 0 ? (
        <Empty description="No notices yet" style={{ padding: '48px 0' }}>
          <Button type="primary" onClick={() => setCreateModalOpen(true)}>
            Post the First Notice
          </Button>
        </Empty>
      ) : (
        <Space direction="vertical" size={16} style={{ width: '100%' }}>
          {notices.map((edge, i) => (
            <Suspense key={i} fallback={<Card loading />}>
              <NoticeCard fragmentRef={edge.node} />
            </Suspense>
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
