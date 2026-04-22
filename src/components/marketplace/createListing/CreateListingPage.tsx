import { Card, Col, Row, Typography, message } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import graphql from 'babel-plugin-relay/macro';
import React, { useCallback, useState } from 'react';
import {
  EntryPointComponent,
  PreloadedQuery,
  useMutation,
  usePreloadedQuery,
} from 'react-relay';
import { useNavigate, useParams } from 'react-router-dom';

import { useAuth } from '../../../contexts/AuthContext';
import { RADIUS_LG } from '../../../design';
import { supabase } from '../../../utils/supabase';
import { Paths } from '../../../views/paths';
import InsertProductCommunityMutation from '../graphql/InsertProductCommunityMutation.graphql';
import InsertProductImagesMutation from '../graphql/InsertProductImagesMutation.graphql';
import InsertProductMutation from '../graphql/InsertProductMutation.graphql';
import { InsertProductCommunityMutationMutation } from '../graphql/__generated__/InsertProductCommunityMutationMutation.graphql';
import { InsertProductImagesMutationMutation } from '../graphql/__generated__/InsertProductImagesMutationMutation.graphql';
import { InsertProductMutationMutation } from '../graphql/__generated__/InsertProductMutationMutation.graphql';
import CreateListingForm, { ListingFormValues } from './CreateListingForm';
import ListingTips from './ListingTips';
import { CreateListingPageQuery } from './__generated__/CreateListingPageQuery.graphql';

export const createListingCategoriesQuery = graphql`
  query CreateListingPageQuery {
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
    categoriesQuery: PreloadedQuery<CreateListingPageQuery>;
  };
};

const CreateListingPage: EntryPointComponent<
  {
    categoriesQuery: CreateListingPageQuery;
  },
  Record<string, never>,
  Record<string, never>
> = (props: Props): React.ReactElement => {
  const navigate = useNavigate();
  const { communityId } = useParams<{ communityId: string }>();
  const { userId } = useAuth();
  const basePath = `/portal/${communityId}`;

  const data = usePreloadedQuery<CreateListingPageQuery>(
    createListingCategoriesQuery,
    props.queries.categoriesQuery
  );

  const categories =
    data.categoriesCollection?.edges?.map((e) => ({
      id: e.node.id,
      name: e.node.name,
    })) ?? [];

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const [commitProductMutation, isMutating] =
    useMutation<InsertProductMutationMutation>(InsertProductMutation);

  const [commitCommunityMutation] =
    useMutation<InsertProductCommunityMutationMutation>(
      InsertProductCommunityMutation
    );

  const [commitImagesMutation] =
    useMutation<InsertProductImagesMutationMutation>(
      InsertProductImagesMutation
    );

  const uploadImages = async (): Promise<string[]> => {
    const paths: string[] = [];

    for (const file of fileList) {
      if (file.originFileObj) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from(`product-images/${userId}`)
          .upload(fileName, file.originFileObj, {
            upsert: false,
            contentType: file.originFileObj.type,
          });

        if (uploadError) throw uploadError;
        paths.push(fileName);
      }
    }

    return paths;
  };

  const handleSubmit = useCallback(
    async (values: ListingFormValues) => {
      if (!userId) {
        message.error('You must be logged in to create a listing.');
        return;
      }

      // Validate that at least one image was uploaded
      if (fileList.length === 0) {
        message.error('Please upload at least one image for your listing.');
        return;
      }

      setUploading(true);
      try {
        const uploadedPaths = await uploadImages();

        if (uploadedPaths.length === 0) {
          message.error('Failed to upload images. Please try again.');
          return;
        }

        if (communityId == null) {
          message.error('Failed to create listing');
          return;
        }

        commitProductMutation({
          variables: {
            objects: [
              {
                name: values.name,
                description: values.description,
                price: values.price,
                categoryId: values.categoryId,
                condition: values.condition as
                  | 'New'
                  | 'Like_new'
                  | 'Good'
                  | 'Used',
                userId,
              },
            ],
          },
          onCompleted: (response) => {
            const newProduct =
              response.insertIntoProductsCollection?.records?.[0];
            if (!newProduct) {
              message.error('Failed to create listing.');
              return;
            }

            const productId = newProduct.id;

            commitCommunityMutation({
              variables: {
                objects: [{ productId, communityId }],
              },
              onError: (err) => {
                console.error(
                  'Failed to associate product with community:',
                  err
                );
              },
            });

            // Insert the uploaded images (guaranteed to have at least one)
            commitImagesMutation({
              variables: {
                objects: uploadedPaths.map((path, index) => ({
                  productId,
                  imageUrl: path,
                  displayOrder: index,
                })),
              },
              onError: (err) => {
                console.error('Failed to save product images:', err);
              },
            });

            message.success('Listing created successfully!');
            navigate(`${basePath}/${Paths.Market}`);
          },
          onError: (err) => {
            message.error(`Failed to create listing: ${err.message}`);
          },
        });
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error';
        message.error(`Upload failed: ${errorMessage}`);
      } finally {
        setUploading(false);
      }
    },
    [
      userId,
      fileList,
      commitProductMutation,
      commitCommunityMutation,
      commitImagesMutation,
      navigate,
      basePath,
      communityId,
    ]
  );

  return (
    <div>
      <Typography.Title level={3}>Create a Listing</Typography.Title>

      <Row gutter={24}>
        <Col xs={24} md={16}>
          <Card style={{ borderRadius: RADIUS_LG }}>
            <CreateListingForm
              categories={categories}
              fileList={fileList}
              onFileListChange={setFileList}
              onSubmit={handleSubmit}
              submitting={isMutating}
              uploading={uploading}
            />
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <ListingTips />
        </Col>
      </Row>
    </div>
  );
};

export default CreateListingPage;
