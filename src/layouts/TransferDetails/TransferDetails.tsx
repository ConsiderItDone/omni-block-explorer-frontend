/** @jsxImportSource theme-ui */
import { useQuery } from '@apollo/client';
import { Spin } from 'antd';
import { Copy } from 'components';
import { TRANSFERDETAILS } from 'queries';
import { TransferDetails as TransferDetails_type } from 'queries/__generated__/TransferDetails';
import React, { FC, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { transferDataTransformer } from 'utils/adapters';
import { ROUTES } from 'utils/consts';
import { renderTime } from 'utils/elements';
import { normalizeCurrency } from 'utils/funcs';
import { useErrorDisaply, useRouter } from 'utils/hooks';
import styles from './styles'

interface Params {
  id: string;
}

const TransferDetails: FC<Params> = () => {
  const { navigate } = useRouter();
  const { id } = useParams();
  const [blockNumber, extrinsicIndex, eventIndex] = id.split('-').map((i) => Number(i));
  const { data, loading, error } = useQuery<TransferDetails_type>(TRANSFERDETAILS, {
    variables: { blockNumber, extrinsicIndex, eventIndex },
  });
  useErrorDisaply(error);

  const transferData = useMemo(() => {
    const received = data ? data?.eventsByIndex?.items[0] : null;

    if (!received) return;
    received?.eventType?.name.toLowerCase() !== 'transfer' && navigate('/');
    return { ...received, data: transferDataTransformer(received.data) };
  }, [data]);
  return (
    <>
      {loading && <Spin size="large" />}
      {transferData && (
        <div sx={styles.transferTable} className="transfer">
          <div className="custom_table transfer">
            <div>
              <div className="primary">From</div>
              <div className="secondary">
                {transferData.data.from}&nbsp;&nbsp;
                <Copy value={transferData.data.from} />
              </div>
            </div>
            <div>
              <div className="primary">To</div>
              <div className="secondary">
                {transferData.data.to}&nbsp;&nbsp;
                <Copy value={transferData.data.to} />
              </div>
            </div>
            <div>
              <div className="primary">Value</div>
              <h1 className="secondary">{normalizeCurrency(transferData.data.value)}</h1>
            </div>
          </div>
          <div sx={styles.extrinsicTable} className="custom_table extrinsic">
            <div className="head">
              <div className="primary">
                <div>
                  <h3>Block</h3>
                  <Link to={`${ROUTES.blocks}/${transferData.block.number}`}>{transferData.block.number}</Link>
                </div>
                <div>
                  <h3>Extrinsic ID</h3>
                  <h2>
                    {transferData.block.number}-{transferData.extrinsic.index}
                  </h2>
                </div>
              </div>
              <div className="secondary">
                <div>
                  <div>Timestamp</div>
                  <div>{renderTime(transferData.block.timestamp)}</div>
                </div>
                <div>
                  <div>Status</div>
                  <div>{transferData.block.finalized ? 'Finalized' : 'Unfinalized'}</div>
                </div>
                <div>
                  <div>Module</div>
                  <div>{transferData.module.name}</div>
                </div>
              </div>
            </div>
            <div className="body">
              <div>
                <div className="primary">Extrinsic Hash</div>
                <div className="secondary">
                  {transferData.extrinsicHash} <Copy value={transferData.extrinsicHash} />
                </div>
              </div>
              <div>
                <div className="primary">Call</div>
                <div className="secondary">{transferData.eventType.name}</div>
              </div>
              <div>
                <div className="primary">Nonce</div>
                <div className="secondary">{transferData.extrinsic.nonce}</div>
              </div>
              <div>
                <div className="primary">Result</div>
                <div className="secondary">{transferData.extrinsic.success ? 'Yes' : 'No'}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TransferDetails;
