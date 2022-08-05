/** @jsxImportSource theme-ui */
import React, { FC, useCallback, useState } from 'react';
import { Tabs } from 'antd';
import { Copy } from 'components';
import styles from './styles';
import { useRouter } from 'utils/hooks';
//import Playground from './Playground';
import PG from './PG';
import Playground from './Playground';

const { TabPane } = Tabs;

const networkName = 'Acala';
const indexerImage = 'onfinality/subql-node:v0.28.2';
const queryImage = 'onfinality/subql-query:v0.12.0';
const totalEntities = '5 298 341';
const synced = '1 499 629';
const syncing = '100% (1.5M/1.5M)';
const lastUpdate = '3 days ago';
const created = '5 months ago';
const githubUrl = 'https://github.com/AcalaNetwork/acala-subql';
const commitVersion = '0486eb2ff44cdd6d401e42c95f8cb961a9388886';
const endpoint = 'https://api.subquery.network/sq/AcalaNetwork/acala';

const TABS = {
  PLAYGROUND: 'playground',
  LOGS: 'logs',
};

const OmniGraph: FC = () => {
  const { pathname, navigate, queryObj } = useRouter();
  const [activeTab, setActiveTab] = useState<string>(queryObj?.tab || TABS.PLAYGROUND);

  const handleTabChange = useCallback((newActive: string) => {
    navigate(`${pathname}?tab=${newActive}`);
    setActiveTab(newActive);
  }, []);

  return (
    <div sx={styles}>
      <div className="panel networkData">
        <div className="head">
          <h3>{networkName}</h3>
          <div className="status">
            <img />
            {`${networkName}Network`}
          </div>
        </div>
        <div className="body">
          <div className="logo-wrap">
            <img src={process.env.REACT_APP_LOGO_SR} />
          </div>
          <div className="content">
            <div className="stats">
              <div>
                <h4>Indexer Image</h4>
                <span>{indexerImage}</span>
              </div>
              <div>
                <h4>Query Image</h4>
                <span>{queryImage}</span>
              </div>
              <div>
                <h4>Total Entities</h4>
                <span>{totalEntities}</span>
              </div>
              <div>
                <h4>Synced</h4>
                <span>{synced}</span>
              </div>
              <div>
                <h4>Syncing</h4>
                <span>{syncing}</span>
              </div>
            </div>
            <div className="data">
              <div>
                <h4>Network</h4>
                <span>{networkName}</span>
              </div>
              <div>
                <h4>Last updated</h4>
                <span>{lastUpdate}</span>
              </div>
              <div>
                <h4>Created</h4>
                <span>{created}</span>
              </div>
              <div>
                <h4>Github</h4>
                <span>{githubUrl}</span>
              </div>
              <div>
                <h4>Commit Version</h4>
                <span>{commitVersion}</span>
                <Copy value={commitVersion} />
              </div>
              <div>
                <h4>Queries (HTTP)</h4>
                <span>{endpoint}</span>
                <Copy value={endpoint} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="panel">
        <div className="head">
          <h3>Playground</h3>
        </div>
        <div className="body">
          <Tabs activeKey={activeTab} onChange={handleTabChange} className="tab">
            <TabPane tab="Playground" key={TABS.PLAYGROUND}>
              <Playground />
            </TabPane>
            <TabPane tab="Logs" key={TABS.LOGS}>
              Logs
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default OmniGraph;
