/** @jsxImportSource theme-ui */
import React, { FC, useState, useCallback } from 'react';
import { useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import queryString from 'query-string';
import { Spin, Tabs } from 'antd';

import { Copy, Table } from 'components';
import { EXTRINSICSDETAILTS } from 'queries';
import { ExtrinsicsDetails } from 'queries/__generated__/ExtrinsicsDetails';
import { ROUTES } from 'utils/consts';
import { eventColumns, transformEventData } from 'layouts/BlockDetails/utils';
import { useErrorDisaply, useRouter } from 'utils/hooks';
import { renderTime } from 'utils/elements';
import { normalizeCurrency } from 'utils/funcs';
import Popover from 'components/Popover/Popover';
import { useStyles } from './styles';

const { TabPane } = Tabs;
interface Params {
  id: string;
}

const Layout_Extrinsics: FC<Params> = () => {
  const { id } = useParams();
  const { search, pathname, navigate } = useRouter();
  const styles = useStyles();

  const { data, loading, error } = useQuery<ExtrinsicsDetails>(EXTRINSICSDETAILTS, {
    variables: { id },
    errorPolicy: 'ignore',
  });
  useErrorDisaply(error);
  const [activeTab, setActiveTab] = useState((search && queryString.parse(search)?.tab.toString()) || 'event');

  const extrinsicsData = data ? data?.extrinsicById : null;

  const handleTabChange = useCallback((newActive: string) => {
    navigate(`${pathname}?tab=${newActive}`);
    setActiveTab(newActive);
  }, []);

  return (
    <>
      {loading && <Spin size="large" />}
      {extrinsicsData &&
        (() => {
          const {
            block: { number, timestamp, finalized },
            hash,
            module,
            extrinsicType,
            //signer,
            //signature,
            nonce,
            success,
            params,
            events,
            index,
            fee,
          } = extrinsicsData;
          const resultFee = fee?.inclusionFee ? fee.inclusionFee?.baseFee + fee.inclusionFee?.lenFee : '';

          return (
            <>
              <div sx={styles} className="custom_table extrinsic">
                <div className="head">
                  <div className="primary">
                    <div>
                      <h3>Block</h3>
                      <Link to={`${ROUTES.blocks}/${number}`}>{number}</Link>
                    </div>
                    <div>
                      <h3>Extrinsic ID</h3>
                      <h2>
                        {number}-{index}
                      </h2>
                    </div>
                  </div>
                  <div className="secondary">
                    <div>
                      <div>Timestamp</div>
                      <div>{renderTime(timestamp)}</div>
                    </div>
                    <div>
                      <div>Status</div>
                      <div>{finalized ? 'Finalized' : 'Unfinalized'}</div>
                    </div>
                    <div>
                      <div>Module</div>
                      <div>{module.name}</div>
                    </div>
                  </div>
                </div>
                <div className="body">
                  <div>
                    <div className="primary">Extrinsic Hash</div>
                    <div className="secondary">
                      <span>{hash}</span> <Copy value={hash} />
                    </div>
                  </div>
                  <div>
                    <div className="primary">Call</div>
                    <div className="secondary">
                      <span>{extrinsicType?.name}</span>{' '}
                      <Popover
                        title="Show params"
                        content={
                          <pre style={{ maxHeight: '300px' }}>{JSON.stringify(JSON.parse(params), null, 2)}</pre>
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <div className="primary">Nonce</div>
                    <div className="secondary">{nonce}</div>
                  </div>
                  <div>
                    <div className="primary">Result</div>
                    <div className="secondary">{success ? 'Yes' : 'No'}</div>
                  </div>
                  {resultFee && (
                    <div>
                      <div className="primary">Fee</div>
                      <div className="secondary">{normalizeCurrency(resultFee)}</div>
                    </div>
                  )}
                </div>
              </div>
              <Tabs activeKey={activeTab} onChange={handleTabChange} className="tabs">
                <TabPane tab={`Events (${events.length})`} key="event">
                  <Table
                    pagination={false}
                    columns={eventColumns}
                    dataSource={events.map((event) => transformEventData(number, event))}
                  />
                </TabPane>
              </Tabs>
            </>
          );
        })()}
    </>
  );
};

export default Layout_Extrinsics;
