/** @jsxImportSource theme-ui */
import React, { FC, useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSubscription, useQuery } from '@apollo/client/react';

import { HOMEPAGE, SUBSCRIPTION_NEW_BLOCKS, SUBSCRIPTION_NEW_TRANSFERS } from 'queries';
import { NewBlocks, NewBlocks_newBlock } from 'queries/__generated__/NewBlocks';
import { NewTransfers, NewTransfers_newEventByName } from 'queries/__generated__/NewTransfers';
import {
  HomePage,
  HomePage_blocks_items,
  HomePage_transfers,
  HomePage_allocations_items,
  HomePage_validators_items,
} from 'queries/__generated__/HomePage';
import { Spin } from 'antd';
import { Table } from 'components';
import { RESPONSIVE_BREAKPOINTS, ROUTES } from 'utils/consts';
import { columnsMini as blockColumns, transformBlockItem } from 'layouts/BlocksTable/utils';
import { transformTransferData, columnsMini as transferColumns } from 'layouts/TransfersTable/utils';
import { transformValidatorData, columnsMini as validatorColumns } from 'layouts/ValidatorsTable/utils';
import './Home.module.styl';
import { transformAllocationData, columnsMini as allocationColumns } from 'layouts/AllocationsTable/util';
import { numberWithCommas } from 'utils/funcs';
import { useErrorDisaply } from 'utils/hooks';
import styles from './styles';

const useSubscriptionOnQuery = () => {
  const [blocks, setBlocks] = useState<(HomePage_blocks_items | NewBlocks_newBlock)[]>();
  const [transfers, setTransfers] = useState<(HomePage_transfers | NewTransfers_newEventByName)[]>();
  const [validators, setValidators] = useState<HomePage_validators_items[]>();
  const [allocations, setAllocations] = useState<HomePage_allocations_items[]>();
  const [chainData, setChainData] = useState(null);
  const { data: initialData, loading, error, refetch } = useQuery<HomePage>(HOMEPAGE);
  const { data: blockSubscription } = useSubscription<NewBlocks>(SUBSCRIPTION_NEW_BLOCKS);
  const { data: transferSubscription } = useSubscription<NewTransfers>(SUBSCRIPTION_NEW_TRANSFERS);

  useErrorDisaply(error);
  useEffect(() => {
    setBlocks(initialData?.blocks?.items.slice(0, 4));
    setTransfers(initialData?.transfers?.items.slice(0, 4));
    setValidators(initialData?.validators?.items.slice(0, 4));
    setAllocations(initialData?.allocations?.items.slice(0, 4));
    setChainData({
      lastFinalizedBlock: initialData?.lastFinalizedBlock?.number || null,
      transferCount: initialData?.transfers?.totalCount || null,
      signedExtrinsics: initialData?.signedExtrinsics?.totalCount || null,
      validatorCount: initialData?.validators?.totalCount || null,
    });
  }, [initialData]);

  useEffect(() => {
    blocks &&
      blockSubscription &&
      blockSubscription?.newBlock?.events?.length >= 1 &&
      setBlocks((blocks) => [blockSubscription.newBlock, ...blocks].slice(0, 4));
  }, [blockSubscription]);

  useEffect(() => {
    transfers && setTransfers((transfers) => [transferSubscription?.newEventByName, ...transfers].slice(0, 4));
  }, [transferSubscription]);

  return { chainData, blocks, transfers, validators, allocations, loading, error, refetch };
};

export const LayoutHome: FC = () => {
  const { chainData, blocks, transfers, validators, allocations: allocRaw, loading } = useSubscriptionOnQuery();

  const blockss = blocks?.map(transformBlockItem);
  const transferss = transfers?.map(transformTransferData);
  const validatorss = validators?.map(transformValidatorData);
  const allocationss = allocRaw?.map(transformAllocationData);
  const allocations = useMemo(
    () =>
      allocRaw?.map((a) => {
        if (typeof a === 'object') {
          return { ...a, data: [a?.data?.who, a?.data?.value, a?.data?.fee] };
        }
        return a;
      }),
    [allocRaw],
  );

  return (
    <div sx={styles}>
      <div className="table_wrapper">
        {chainData && (
          <div className="chainData fullWidth">
            <h2 className="title">Chain Data</h2>
            <div className="data">
              {loading ? (
                <Spin />
              ) : (
                <>
                  <div>
                    <h4>Finalized Blocks</h4>
                    {loading ? <Spin /> : <h3>{numberWithCommas(chainData?.lastFinalizedBlock)}</h3>}
                  </div>
                  <div>
                    <h4>Signed Extrinsics</h4>
                    {loading ? <Spin /> : <h3>{numberWithCommas(chainData?.signedExtrinsics)}</h3>}
                  </div>
                  {window?.innerWidth <= RESPONSIVE_BREAKPOINTS.md && <span className="separator" />}
                  <div>
                    <h4>Transfers</h4>
                    {loading ? <Spin /> : <h3>{numberWithCommas(chainData?.transferCount)}</h3>}
                  </div>
                  <div>
                    <h4>Validators</h4>
                    {loading ? <Spin /> : <h3>{numberWithCommas(chainData?.validatorCount)}</h3>}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
        <div className="tables">
          {loading && <Spin size="large" />}

          {blocks && (
            <Table
              dataSource={blockss}
              columns={blockColumns}
              pagination={false}
              header={
                <>
                  <h3>Latest Blocks</h3>
                  <Link to={ROUTES.blocks} className="ant-btn">
                    See all
                  </Link>
                </>
              }
            />
          )}
          {transfers && (
            <Table
              dataSource={transferss}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              columns={transferColumns}
              pagination={false}
              header={
                <>
                  <h3>Transfers</h3>
                  <Link to={ROUTES.transfers} className="ant-btn">
                    See all
                  </Link>
                </>
              }
            />
          )}
          {validators && (
            <Table
              dataSource={validatorss}
              columns={validatorColumns}
              pagination={false}
              header={
                <>
                  <h3>Validators</h3>
                  <Link to={ROUTES.validators} className="ant-btn">
                    See all
                  </Link>
                </>
              }
            />
          )}
          {allocations && (
            <Table
              dataSource={allocationss}
              columns={allocationColumns}
              pagination={false}
              header={
                <>
                  <h3>Allocations</h3>
                  <Link to={ROUTES.allocations} className="ant-btn">
                    See all
                  </Link>
                </>
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LayoutHome;
