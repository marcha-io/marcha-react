import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Empty, Flex, Row, Typography } from 'antd';
import React, { Suspense, useState } from 'react';

import { NEUTRAL_500 } from '../../design';
import CreateEventModal from './CreateEventModal';
import EventCard from './EventCard';
import type { EventsPageWrapperQuery$data } from './__generated__/EventsPageWrapperQuery.graphql';

type Props = {
  data: EventsPageWrapperQuery$data;
};

const EventsPage: React.FC<Props> = ({ data }) => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const events = data.eventsCollection?.edges ?? [];

  return (
    <div>
      <Flex justify="space-between" align="center" style={{ marginBottom: 24 }}>
        <div>
          <Typography.Title level={3} style={{ margin: 0 }}>
            Community Events
          </Typography.Title>
          <Typography.Text style={{ color: NEUTRAL_500, fontSize: 13 }}>
            {events.length} upcoming event{events.length !== 1 ? 's' : ''}
          </Typography.Text>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setCreateModalOpen(true)}
        >
          Create Event
        </Button>
      </Flex>

      {events.length === 0 ? (
        <Empty description="No upcoming events" style={{ padding: '48px 0' }}>
          <Button type="primary" onClick={() => setCreateModalOpen(true)}>
            Create the First Event
          </Button>
        </Empty>
      ) : (
        <Row gutter={[16, 16]}>
          {events.map((edge, i) => (
            <Col xs={24} sm={12} md={8} lg={6} key={i}>
              <Suspense fallback={<Card loading />}>
                <EventCard fragmentRef={edge.node} />
              </Suspense>
            </Col>
          ))}
        </Row>
      )}

      <CreateEventModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
    </div>
  );
};

export default EventsPage;
