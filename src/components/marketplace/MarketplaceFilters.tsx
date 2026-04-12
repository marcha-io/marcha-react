import { SearchOutlined } from '@ant-design/icons';
import { Flex, Input, Select } from 'antd';
import React, { Suspense, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { NEUTRAL_400, RADIUS_LG } from '../../design';
import { useDebounce } from '../../hooks/useDebounce';
import { CONDITIONS } from './constants';
import CategoriesFilter from './marketplaceFilters/CategoriesFilter';
import CategoriesFilterLoading from './marketplaceFilters/CategoriesFilterLoading';

const MarketplaceFilters = (): React.ReactElement => {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlQuery = searchParams.get('q') ?? '';
  const currentCondition = searchParams.get('conditions')?.split(',') ?? [];

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
      next.delete('cursor');
      return next;
    });
  }, [debouncedQuery, setSearchParams]);

  const updateParam = useCallback(
    (key: string, value: string | null | undefined) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (value) {
          next.set(key, value);
        } else {
          next.delete(key);
        }

        next.delete('cursor');
        return next;
      });
    },
    [setSearchParams]
  );

  return (
    <div style={{ marginBottom: 16 }}>
      <Input
        placeholder="Search items..."
        prefix={<SearchOutlined style={{ color: NEUTRAL_400 }} />}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onClear={() => setInputValue('')}
        allowClear
        style={{ borderRadius: RADIUS_LG, marginBottom: 12, height: 40 }}
      />

      <Flex gap={12} wrap="wrap">
        <Suspense fallback={<CategoriesFilterLoading />}>
          <CategoriesFilter
            setCategories={(category) => updateParam('categories', category)}
          />
        </Suspense>
        <Select
          placeholder="All Conditions"
          mode="multiple"
          allowClear
          value={currentCondition}
          onClear={() => updateParam('conditions', '')}
          onChange={(val) => updateParam('conditions', val.join(','))}
          options={CONDITIONS as unknown as { label: string; value: string }[]}
          style={{ minWidth: 160, flex: 1 }}
        />
      </Flex>
    </div>
  );
};

export default MarketplaceFilters;
