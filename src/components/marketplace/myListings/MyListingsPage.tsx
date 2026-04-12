import { Button, Col, Empty, Flex, Row, Typography, message } from 'antd';
import graphql from 'babel-plugin-relay/macro';
import React, { useCallback, useState } from 'react';
import {
  EntryPointComponent,
  PreloadedQuery,
  useMutation,
  usePreloadedQuery,
} from 'react-relay';
import { useNavigate, useParams } from 'react-router-dom';

import { NEUTRAL_500 } from '../../../design';
import { Paths } from '../../../views/paths';
import EditListingModal, { ListingData } from '../EditListingModal';
import UpdateProductMutation from '../graphql/UpdateProductMutation.graphql';
import type { UpdateProductMutationMutation } from '../graphql/__generated__/UpdateProductMutationMutation.graphql';
import MyListingCard, { ListingNode } from './MyListingCard';
import { MyListingsPageQuery } from './__generated__/MyListingsPageQuery.graphql';

export const myListingsPageQuery = graphql`
  query MyListingsPageQuery($userId: UUIDFilter!) {
    productsCollection(
      filter: { userId: $userId }
      orderBy: [{ createdAt: DescNullsLast }]
    ) {
      edges {
        node {
          id
          name
          description
          price
          condition
          categoryId
          isPublic
          createdAt
          productImagesCollection(
            first: 1
            orderBy: [{ displayOrder: AscNullsLast }]
          ) {
            edges {
              node {
                imageUrl
              }
            }
          }
        }
      }
    }
    categoriesCollection {
      edges {
        node {
          id
          name
          nodeId
        }
      }
    }
  }
`;

type Props = {
  queries: {
    myListingsQuery: PreloadedQuery<MyListingsPageQuery>;
  };
};

const MyListingsPage: EntryPointComponent<
  {
    myListingsQuery: MyListingsPageQuery;
  },
  Record<string, never>,
  Record<string, never>
> = (props: Props): React.ReactElement => {
  const navigate = useNavigate();
  const { communityId } = useParams<{ communityId: string }>();
  const basePath = `/portal/${communityId}`;

  const data = usePreloadedQuery<MyListingsPageQuery>(
    myListingsPageQuery,
    props.queries.myListingsQuery
  );

  const listings = data.productsCollection?.edges ?? [];
  const categories =
    data.categoriesCollection?.edges?.map((e) => ({
      id: e.node.id,
      name: e.node.name,
    })) ?? [];

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingListing, setEditingListing] = useState<ListingData | null>(
    null
  );
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const [commitUpdate] = useMutation<UpdateProductMutationMutation>(
    UpdateProductMutation
  );

  const handleEdit = useCallback((listing: ListingNode) => {
    setEditingListing({
      id: listing.id,
      name: listing.name,
      description: listing.description,
      price: listing.price,
      condition: listing.condition,
      categoryId: listing.categoryId ?? null,
    });
    setEditModalOpen(true);
  }, []);

  const handleToggleVisibility = useCallback(
    (listing: ListingNode) => {
      const newIsPublic = !listing.isPublic;
      setTogglingId(listing.id);

      commitUpdate({
        variables: {
          set: { isPublic: newIsPublic },
          filter: { id: { eq: listing.id } },
          atMost: 1,
        },
        onCompleted: () => {
          message.success(
            newIsPublic ? 'Listing is now active.' : 'Listing unlisted.'
          );
          setTogglingId(null);
        },
        onError: (err) => {
          message.error(`Failed to update listing: ${err.message}`);
          setTogglingId(null);
        },
      });
    },
    [commitUpdate]
  );

  return (
    <div>
      <Flex justify="space-between" align="center" style={{ marginBottom: 24 }}>
        <div>
          <Typography.Title level={3} style={{ margin: 0 }}>
            My Listings
          </Typography.Title>
          <Typography.Text style={{ color: NEUTRAL_500, fontSize: 13 }}>
            {listings.length} listing{listings.length !== 1 ? 's' : ''} total
          </Typography.Text>
        </div>
        <Button
          type="primary"
          onClick={() => navigate(`${basePath}/${Paths.Market}/new`)}
        >
          Create New Listing
        </Button>
      </Flex>

      {listings.length === 0 ? (
        <Empty
          description="You haven't created any listings yet"
          style={{ padding: '48px 0' }}
        >
          <Button
            type="primary"
            onClick={() => navigate(`${basePath}/${Paths.Market}/new`)}
          >
            Create Your First Listing
          </Button>
        </Empty>
      ) : (
        <Row gutter={[16, 16]}>
          {listings.map((edge) => (
            <Col xs={24} sm={12} md={8} lg={6} key={edge.node.id}>
              <MyListingCard
                listing={edge.node}
                onEdit={handleEdit}
                onToggleVisibility={handleToggleVisibility}
                isTogglingVisibility={togglingId === edge.node.id}
              />
            </Col>
          ))}
        </Row>
      )}

      <EditListingModal
        open={editModalOpen}
        listing={editingListing}
        categories={categories}
        onClose={() => setEditModalOpen(false)}
        onSuccess={() => {
          setEditModalOpen(false);
        }}
      />
    </div>
  );
};

export default MyListingsPage;
