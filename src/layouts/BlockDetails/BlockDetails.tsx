/** @jsxImportSource theme-ui */
import React, { FC, useCallback, useState } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/client/react';
import { Spin, Tabs } from 'antd';
import queryString from 'query-string';

import { BLOCK } from 'queries';
import { Block } from 'queries/__generated__/Block';
import { Copy, Table } from 'components';

import { blockExtrinsics as extrinsicsColumns, transformExtrinsicData } from '../ExtrinsicsTable/utils';
import { logsColumns, eventColumns, transformEventData, transformLogData } from './utils';
import { useErrorDisaply, useRouter } from 'utils/hooks';
import moment from 'moment';
import { useStyles } from './styles';

const { TabPane } = Tabs;
interface Params {
  id: string;
}

const Layout_Block: FC<Params> = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery<Block>(BLOCK, { errorPolicy: 'ignore', variables: { id } }); //TODO remove 'errorPolicy:ignore' after fix : "invalid input syntax for type bigint: \"0x1a2e718cad7558248775315fcb9130b19b7e0a2cc30f3077ea9820a337e316a5\""
  const { search, pathname, navigate } = useRouter();
  const styles = useStyles();
  useErrorDisaply(error);
  const [activeTab, setActiveTab] = useState((search && queryString.parse(search)?.tab.toString()) || 'extrinsics');
  const blockData = data ? data?.blockByHash || data?.blockByBlockNumber : null;

  const handleTabChange = useCallback((newActive: string) => {
    navigate(`${pathname}?tab=${newActive}`);
    setActiveTab(newActive);
  }, []);

  return (
    <div sx={styles} className="block">
      {loading && <Spin size="large" />}
      {blockData && (
        <>
          <div className="custom_table block">
            <div className="head">
              <div className="primary">
                <h3>Block</h3>
                <h1>{blockData.number}</h1>
              </div>
              <div className="secondary">
                <div>
                  <div>Timestamp</div>
                  <div>{moment(blockData.timestamp).format('MM/DD/YYYY, h:mm:ss a')}</div>
                </div>
                <div>
                  <div>Status</div>
                  <div>{blockData.finalized ? 'Finalized' : 'Unfinalized'}</div>
                </div>
                <div>
                  <div>Spec Version</div>
                  <div>{blockData.specVersion}</div>
                </div>
              </div>
            </div>
            <div className="body">
              <div>
                <div className="primary">Hash</div>
                <div className="secondary">
                  {blockData.hash} <Copy value={blockData.hash} />
                </div>
              </div>
              <div>
                <div className="primary">Parent Hash</div>
                <div className="secondary">
                  {blockData.parentHash} <Copy value={blockData.parentHash} />
                </div>
              </div>
              <div>
                <div className="primary">State Root</div>
                <div className="secondary">
                  {blockData.stateRoot} <Copy value={blockData.stateRoot} />
                </div>
              </div>
              <div>
                <div className="primary">Extrinsics Root</div>
                <div className="secondary">
                  {blockData.extrinsicsRoot} <Copy value={blockData.extrinsicsRoot} />
                </div>
              </div>
            </div>
          </div>
          <Tabs activeKey={activeTab} onChange={handleTabChange} className="tabs">
            <TabPane tab={`Extrinsics (${blockData.extrinsics.length})`} key="extrinsics">
              <Table
                dataSource={blockData.extrinsics.map(transformExtrinsicData)}
                columns={extrinsicsColumns}
                pagination={false}
              />
            </TabPane>
            <TabPane tab={`Events (${blockData.events.length})`} key="events">
              <Table
                columns={eventColumns}
                dataSource={blockData.events.map((event) => transformEventData(parseInt(blockData.number), event))}
                pagination={false}
              />
            </TabPane>
            <TabPane tab={`Logs (${blockData.logs.length})`} key="logs">
              <Table
                columns={logsColumns}
                dataSource={blockData.logs.map((log) => transformLogData(parseInt(blockData.number), log))}
                pagination={false}
              />
            </TabPane>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default Layout_Block;
