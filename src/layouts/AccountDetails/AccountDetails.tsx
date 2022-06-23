/** @jsxImportSource theme-ui */
import { useQuery } from '@apollo/client';
import React, { FC, useMemo } from 'react';
import { ACCOUNTBYADDRESS } from 'queries';
import { AccountByAddress } from 'queries/__generated__/AccountByAddress';
import { Spin, Tabs } from 'antd';
import { Copy, Table } from 'components';
import { vestingScheduleColumns } from './util';
import { useParams } from 'react-router-dom';

import { transformExtrinsicData, columns as extrinsicColumns } from 'layouts/ExtrinsicsTable/utils';
import { transformTransferData, columns as transferColumns } from 'layouts/TransfersTable/utils';
import { transformCertificate, columns as certificateColumns } from 'layouts/CertificatesTable/utils';
import { transformApplicationData, columns as applicationColumns } from 'layouts/ApplicationsTable/utils';
import { transformAllocationData, columns as allocationColumns } from 'layouts/AllocationsTable/util';
import { normalizeCurrency } from 'utils/funcs';
import { useErrorDisaply } from 'utils/hooks';
import styles from './styles';

const { TabPane } = Tabs;

const AccountDetails: FC = () => {
  const { accountAddress } = useParams();
  const { data, loading, error } = useQuery<AccountByAddress>(ACCOUNTBYADDRESS, {
    variables: { address: accountAddress },
  });

  useErrorDisaply(error);

  const extrinsics = useMemo(() => data?.accountByAddress?.extrinsics?.map(transformExtrinsicData), [data]);
  const transfers = useMemo(
    () => data?.transfersFrom?.items.concat(data?.transfersTo?.items).map(transformTransferData),
    [data],
  );

  const vestingSchedules = useMemo(() => data?.accountByAddress?.vestingSchedules, [data]);

  const applications = useMemo(
    () =>
      data?.accountByAddress?.applicationsByCandidate
        ?.concat(data?.accountByAddress?.applicationsByChallenger)
        .map(transformApplicationData),
    [data],
  );
  const certificates = useMemo(
    () =>
      data?.accountByAddress?.rootCertificatesByKey
        ?.concat(data?.accountByAddress?.rootCertificatesByOwner)
        .map(transformCertificate),
    [data],
  );
  const allocations = useMemo(() => data?.allocations?.items.map(transformAllocationData), [data]);

  return (
    <>
      {loading && <Spin size="large" />}
      {data?.accountByAddress &&
        (() => {
          const {
            accountByAddress: { address, nonce, refcount, validator },
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
                        <span className="value">{validator ? 'Validator' : 'Receiver'}</span>
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
                  {vestingSchedules && (
                    <TabPane
                      key="vestingSchedules"
                      tab={
                        <>
                          Vesting Schedules <span>({vestingSchedules?.length || 0})</span>
                        </>
                      }
                    >
                      <Table dataSource={vestingSchedules} columns={vestingScheduleColumns} />
                    </TabPane>
                  )}
                  {certificates && (
                    <TabPane
                      key="certificates"
                      tab={
                        <>
                          Root Certificates <span>({certificates?.length || 0})</span>
                        </>
                      }
                    >
                      <Table dataSource={certificates} columns={certificateColumns} />
                    </TabPane>
                  )}
                  {applications && (
                    <TabPane
                      key="applications"
                      tab={
                        <>
                          Applications <span>({applications?.length || 0}) </span>
                        </>
                      }
                    >
                      <Table dataSource={applications} columns={applicationColumns} />
                    </TabPane>
                  )}
                  {allocations && (
                    <TabPane
                      key="allocations"
                      tab={
                        <>
                          Allocations <span>({allocations?.length || 0})</span>
                        </>
                      }
                    >
                      <Table dataSource={allocations} columns={allocationColumns} />
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
