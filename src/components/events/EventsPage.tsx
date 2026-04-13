import {
  CalendarOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Col, Empty, Flex, Input, Row, Typography } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { NEUTRAL_400, RADIUS_LG } from '../../design';
import { useDebounce } from '../../hooks/useDebounce';
import { Paths } from '../../views/paths';
import CreateEventModal from './CreateEventModal';
import EventCard from './EventCard';
import type { EventsPageWrapperQuery$data } from './__generated__/EventsPageWrapperQuery.graphql';

type Props = {
  data: EventsPageWrapperQuery$data;
};

const EventsPage: React.FC<Props> = ({ data }) => {
  const navigate = useNavigate();
  const { communityId } = useParams<{ communityId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const urlQuery = searchParams.get('q') ?? '';
  const [inputValue, setInputValue] = useState(urlQuery);

  useEffect(() => {
    setInputValue(urlQuery);
  }, [urlQuery]);

  const debouncedQuery = useDebounce(inputValue, 400);

  useEffect(() => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (debouncedQuery) {
        next.set('q', debouncedQuery);
      } else {
        next.delete('q');
      }
      return next;
    });
  }, [debouncedQuery, setSearchParams]);

  const basePath = `/portal/${communityId}`;
  const edges = data.eventsCollection?.edges ?? [];

  const handleEventClick = useCallback(
    (eventId: string) => {
      navigate(`${basePath}/${Paths.Events}/${eventId}`);
    },
    [navigate, basePath]
  );

  return (
    <div>
      <Flex justify="space-between" align="center" style={{ marginBottom: 24 }}>
        <Typography.Title level={3} style={{ margin: 0 }}>
          Community Events
        </Typography.Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setCreateModalOpen(true)}
        >
          Create Event
        </Button>
      </Flex>

      <Input
        placeholder="Search events..."
        prefix={<SearchOutlined style={{ color: NEUTRAL_400 }} />}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onClear={() => setInputValue('')}
        allowClear
        style={{ borderRadius: RADIUS_LG, marginBottom: 24, height: 40 }}
      />

      {edges.length === 0 ? (
        <Empty
          image={
            <CalendarOutlined
              style={{ fontSize: 64, color: NEUTRAL_400, marginTop: 32 }}
            />
          }
          description="No events found"
        >
          <Button type="primary" onClick={() => setCreateModalOpen(true)}>
            Create the first event
          </Button>
        </Empty>
      ) : (
        <Row gutter={[16, 16]}>
          {edges.map((edge) => (
            <Col xs={24} sm={12} md={8} lg={6} key={edge.node.id}>
              <EventCard fragmentRef={edge.node} onClick={handleEventClick} />
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
