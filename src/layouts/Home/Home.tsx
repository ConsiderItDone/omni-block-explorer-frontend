/** @jsxImportSource theme-ui */
import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSubscription, useQuery } from '@apollo/client/react';

import { HOMEPAGE, SUBSCRIPTION_NEW_BLOCKS, SUBSCRIPTION_NEW_TRANSFERS } from 'queries';
import { NewBlocks, NewBlocks_newBlock } from 'queries/__generated__/NewBlocks';
import { NewTransfers, NewTransfers_newEventByName } from 'queries/__generated__/NewTransfers';
import { HomePage, HomePage_blocks_items, HomePage_transfers } from 'queries/__generated__/HomePage';
import { Spin } from 'antd';
import { Table } from 'components';
import { RESPONSIVE_BREAKPOINTS, ROUTES } from 'utils/consts';
import { columnsMini as blockColumns, transformBlockItem } from 'layouts/BlocksTable/utils';
import { transformTransferData, columnsMini as transferColumns } from 'layouts/TransfersTable/utils';
import './Home.module.styl';
import { numberWithCommas } from 'utils/funcs';
import { useErrorDisaply } from 'utils/hooks';
import { useStyles } from './styles';

const useSubscriptionOnQuery = () => {
  const [blocks, setBlocks] = useState<(HomePage_blocks_items | NewBlocks_newBlock)[]>();
  const [transfers, setTransfers] = useState<(HomePage_transfers | NewTransfers_newEventByName)[]>();
  const [chainData, setChainData] = useState(null);
  const { data: initialData, loading, error, refetch } = useQuery<HomePage>(HOMEPAGE);
  const { data: blockSubscription } = useSubscription<NewBlocks>(SUBSCRIPTION_NEW_BLOCKS);
  const { data: transferSubscription } = useSubscription<NewTransfers>(SUBSCRIPTION_NEW_TRANSFERS);

  useErrorDisaply(error);
  useEffect(() => {
    setBlocks(initialData?.blocks?.items.slice(0, 4));
    setTransfers(initialData?.transfers?.items.slice(0, 4));
    setChainData({
      lastFinalizedBlock: initialData?.lastFinalizedBlock?.number || null,
      transferCount: initialData?.transfers?.totalCount || null,
      signedExtrinsics: initialData?.signedExtrinsics?.totalCount || null,
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

  return { chainData, blocks, transfers, loading, error, refetch };
};

export const LayoutHome: FC = () => {
  const { chainData, blocks, transfers, loading } = useSubscriptionOnQuery();
  const styles = useStyles();

  const blockss = blocks?.map(transformBlockItem);
  const transferss = transfers?.map(transformTransferData).filter(Boolean);

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
        </div>
      </div>
    </div>
  );
};

export default LayoutHome;
