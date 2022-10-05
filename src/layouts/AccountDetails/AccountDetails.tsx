/** @jsxImportSource theme-ui */
import { useQuery } from '@apollo/client';
import React, { FC, useEffect, useMemo } from 'react';
import { ACCOUNTBYADDRESS } from 'queries';
import { AccountByAddress } from 'queries/__generated__/AccountByAddress';
import { Spin, Tabs } from 'antd';
import { Copy, Table } from 'components';
import { useParams } from 'react-router-dom';
import {toast} from 'react-toastify'
import { transformExtrinsicData, columns as extrinsicColumns } from 'layouts/ExtrinsicsTable/utils';
import { transformTransferData, columns as transferColumns } from 'layouts/TransfersTable/utils';
import { normalizeCurrency } from 'utils/funcs';
import { useErrorDisaply } from 'utils/hooks';
import { useStyles } from './styles';

const { TabPane } = Tabs;

const AccountDetails: FC = () => {
  const { accountAddress } = useParams();
  const { data, loading, error } = useQuery<AccountByAddress>(ACCOUNTBYADDRESS, {
    variables: { address: accountAddress },
    errorPolicy: 'ignore',
  });
  const styles = useStyles();

  useErrorDisaply(error);

  const extrinsics = useMemo(() => data?.accountByAddress?.extrinsics?.map(transformExtrinsicData), [data]);
  const transfers = useMemo(
    () => data?.transfersFrom?.items.concat(data?.transfersTo?.items).map(transformTransferData).filter(Boolean),
    [data],
  );
  useEffect(()=>{
    if(data?.accountByAddress === null && (data.transfersFrom ||data.transfersTo)){
      toast.info("Account isn't processed yet")
    }
    console.log('data', data)
  },[data])

  return (
    <>
      {loading && <Spin size="large" />}
      {data?.accountByAddress &&
        (() => {
          const {
            accountByAddress: { address, nonce, refcount },
          } = data;
          const balance = data?.accountByAddress?.balance || {
            free: null,
            reserved: null,
            miscFrozen: null,
            feeFrozen: null,
          };
          const { free, reserved, miscFrozen, feeFrozen } = balance;

          return (
            <div sx={styles}>
              <div className="account-details-wrapper">
                <section>
                  <div className="info">
                    <div className="address">
                      <span style={{ marginRight: '10px' }}>{address} </span>
                      <Copy value={address} />
                    </div>
                    <div className="props">
                      {typeof refcount === 'number' && (
                        <div>
                          <span className="label">Refcount</span>
                          <span className="value">{refcount}</span>
                        </div>
                      )}
                      {typeof nonce === 'number' && (
                        <div>
                          <span className="label">Nonce</span>
                          <span className="value">{nonce}</span>
                        </div>
                      )}
                      <div>
                        <span className="label">Role</span>
                        <span className="value">{'Receiver'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="balance">
                    <div className="free">
                      <span>Balance</span>
                      <h1>{normalizeCurrency(free)}</h1>
                    </div>
                    <div className="rest">
                      <div>
                        <span>Reserved</span>
                        <h2>{normalizeCurrency(reserved)}</h2>
                      </div>
                      <div>
                        <span>Locked</span>
                        <h2>{normalizeCurrency(Math.max(Number(miscFrozen), Number(feeFrozen)))}</h2>
                      </div>
                    </div>
                  </div>
                </section>
                <Tabs className="tabs">
                  {extrinsics && (
                    <TabPane
                      key="extrinsic"
                      tab={
                        <>
                          Extrinsics<span>({extrinsics?.length || 0})</span>
                        </>
                      }
                    >
                      <Table dataSource={extrinsics} columns={extrinsicColumns} />
                    </TabPane>
                  )}
                  {transfers && (
                    <TabPane
                      key="transfer"
                      tab={
                        <>
                          Transfers<span>({transfers?.length || 0})</span>
                        </>
                      }
                    >
                      <Table dataSource={transfers} columns={transferColumns} />
                    </TabPane>
                  )}
                </Tabs>
              </div>
            </div>
          );
        })()}
    </>
  );
};

export default AccountDetails;
