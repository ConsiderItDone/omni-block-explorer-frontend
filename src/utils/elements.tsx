import React from 'react';
import { Tooltip } from 'antd';
import moment from 'moment';
/* eslint-disable @typescript-eslint/no-var-requires */
//const tooltipSrc = require('images/tooltip.png');

export const renderTime = (val: string, tooltip = true): JSX.Element => {
  return (
    <div className="timestamp">
      {tooltip ? (
        <Tooltip title={moment(val).format('MM/DD/YYYY, h:mm:ss a')} className="tooltip">
          {moment(val).fromNow()}
          {/* <img alt="tooltip" style={{ marginLeft: 10 }} src={tooltipSrc} /> */}
        </Tooltip>
      ) : (
        moment(val).fromNow()
      )}
    </div>
  );
};
