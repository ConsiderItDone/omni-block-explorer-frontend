/* eslint-disable */
import React, { FC, useEffect, useState, useCallback, useMemo } from 'react';
import { useQuery } from '@apollo/client/react';
import { Table } from 'components';
import { ALLOCATIONS } from 'queries';
import { Allocations } from 'queries/__generated__/Allocations';
import { transformAllocationData, columns } from './util';
import { useErrorDisaply, useRouter } from 'utils/hooks';
import { RESPONSIVE_BREAKPOINTS, ROUTES } from 'utils/consts';
import { stringifyValues } from 'utils/funcs';
import { Button, Form, Input } from 'antd';

const { Item } = Form;
const AllocationsTable: FC = () => {
  const { search, navigate, skip, queryObj } = useRouter();
  const [mobileActive, setMobileActive] = useState<boolean>(false);
  const [filterParams, setFilterParams] = useState({
    receiver: queryObj?.receiver || '',
  });

  const { data, loading, error } = useQuery<Allocations>(ALLOCATIONS, {
    variables: { skip, filters: { who: queryObj?.receiver } },
  });
  useErrorDisaply(error);
  const allocations = useMemo(() => (data ? data?.events?.items.map(transformAllocationData) : null), [data]);

  const handleSubmit = useCallback(
    (formValues: any) => {
      mobileActive && setMobileActive(false);
      const path = formValues?.receiver ? `?${stringifyValues(formValues)}` : '';
      navigate(`${ROUTES.allocations}${path}`);
    },
    [mobileActive],
  );

  useEffect(() => {
    setFilterParams({ receiver: queryObj?.receiver });
  }, [search]);

  return (
    <div className="transfers">
      <Table
        dataSource={allocations}
        loading={loading}
        columns={columns}
        className="table"
        total={data?.events?.totalCount}
        header={
          <>
            <h3>
              All Allocations
              {data?.events?.totalCount ? <span className="addon"> ({data?.events?.totalCount})</span> : ''}
            </h3>
            {window.innerWidth <= RESPONSIVE_BREAKPOINTS.md ? (
              <>
                <Button onClick={() => setMobileActive(true)}>Filter</Button>
                <div className={`filter-mobile${mobileActive ? ' active' : ''}`}>
                  <Button className="closeBtn" onClick={() => setMobileActive(false)}>
                    X
                  </Button>
                  <Form onFinish={handleSubmit} initialValues={filterParams}>
                    <Item name="receiver">
                      <Input prefix="Receiver " />
                    </Item>
                    <Item>
                      <Button htmlType="submit">Apply</Button>
                    </Item>
                  </Form>
                </div>
              </>
            ) : (
              <Form layout="inline" onFinish={handleSubmit} initialValues={filterParams}>
                <Item name="receiver">
                  <Input prefix="Receiver " />
                </Item>
                <Item>
                  <Button htmlType="submit">Apply</Button>
                </Item>
              </Form>
            )}
          </>
        }
      />
    </div>
  );
};

export default AllocationsTable;
