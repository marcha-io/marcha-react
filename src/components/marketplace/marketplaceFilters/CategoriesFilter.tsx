import { Select } from 'antd';
import graphql from 'babel-plugin-relay/macro';
import { useLazyLoadQuery } from 'react-relay';
import { useSearchParams } from 'react-router-dom';

import { CategoriesFilterQuery } from './__generated__/CategoriesFilterQuery.graphql';

type Props = {
  setCategories: (category: string) => void;
};

const categoriesFilterQuery = graphql`
  query CategoriesFilterQuery {
    categoriesCollection {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

const CategoriesFilter = ({ setCategories }: Props) => {
  const [searchParams] = useSearchParams();

  const data = useLazyLoadQuery<CategoriesFilterQuery>(
    categoriesFilterQuery,
    {}
  );

  const categoryFromSearchParam =
    searchParams.get('categories')?.split(',') ?? [];

  const categories =
    data.categoriesCollection?.edges?.map((e) => ({
      value: e.node.id,
      label: e.node.name,
    })) ?? [];

  return (
    <Select
      placeholder="All Categories"
      mode="multiple"
      allowClear
      onClear={() => setCategories('')}
      value={categoryFromSearchParam}
      onChange={(val) => setCategories(val.join(','))}
      options={categories}
      style={{ minWidth: 160, flex: 1 }}
    />
  );
};

export default CategoriesFilter;
