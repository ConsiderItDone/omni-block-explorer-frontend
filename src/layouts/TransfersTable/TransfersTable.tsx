/* eslint-disable */
import React, { FC, useRef, useEffect, useState, useCallback } from 'react';
import { useQuery } from '@apollo/client/react';

import { Input, Form, Button } from 'antd';

import { Table } from 'components';
import { Transfers } from 'queries/__generated__/Transfers';
import { TRANSFERS, CHART_TRANSFERTS } from 'queries';
import { transformTransferData, columns, generateQueryVars } from './utils';
import { ChartTransfers } from 'queries/__generated__/ChartTransfers';
import { RESPONSIVE_BREAKPOINTS, ROUTES } from 'utils/consts';
import { useRouter, useChart, useErrorDisaply } from 'utils/hooks';
import { stringifyValues } from 'utils/funcs';

const { Item } = Form;

const LayoutTransfers: FC = () => {
  const { search, navigate, skip, queryObj } = useRouter();
  const [filterParams, setFilterParams] = useState({ from: queryObj?.from, to: queryObj?.to });
  const [mobileActive, setMobileActive] = useState<boolean>(false);
  const { data: chartData, loading: chartLoading } = useQuery<ChartTransfers>(CHART_TRANSFERTS);
  const { data, loading, error } = useQuery<Transfers>(TRANSFERS, {
    variables: { ...generateQueryVars(filterParams), skip },
  });
  useErrorDisaply(error);

  const transfers = data ? data.events.items?.map(transformTransferData) : null;

  const x = useRef(null);

  useChart('transfers', x, chartData);

  useEffect(() => {
    setFilterParams({ from: queryObj?.from, to: queryObj?.to });
  }, [search]);

  const handleSubmit = useCallback(
    (formValues: any) => {
      mobileActive && setMobileActive(false);
      navigate(`${ROUTES.transfers}?${stringifyValues(formValues)}`);
    },
    [mobileActive],
  );

  return (
    <div className="transfers">
      <div id="chartdiv" style={{ width: '100%', height: '500px', borderRadius: 24, marginBottom: 32 }}></div>
      <Table
        dataSource={transfers}
        loading={loading}
        columns={columns}
        className="table"
        total={data?.events?.totalCount}
        header={
          <>
            <h3>
              All Transfers
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
                    <Item name="from">
                      <Input prefix="From " />
                    </Item>
                    <Item name="to">
                      <Input prefix="To " />
                    </Item>
                    <Item>
                      <Button htmlType="submit">Apply</Button>
                    </Item>
                  </Form>
                </div>
              </>
            ) : (
              <Form layout="inline" onFinish={handleSubmit} initialValues={filterParams}>
                <Item name="from">
                  <Input prefix="From " />
                </Item>
                <Item name="to">
                  <Input prefix="To " />
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

export default LayoutTransfers;
