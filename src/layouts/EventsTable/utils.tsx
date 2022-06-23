import React from 'react';
import { Link } from 'react-router-dom';
import { Events_events_items } from 'queries/__generated__/Events';

import { TransformedEventData } from './types';
import { generateColumns } from 'utils/generators';
import { renderTime } from 'utils/elements';
import { RESPONSIVE_BREAKPOINTS, ROUTES } from 'utils/consts';
import Popover from 'components/Popover/Popover';

const eventTableItem = {
  id: '',
  block: '',
  extrinsicHash: '',
  time: '',
  action: '',
  data: '',
};
export const columns = generateColumns(eventTableItem, {
  id: {
    width: 100,
    title: 'Extrinsic ID',
    //eslint-disable-next-line
    render: (value: string, record: any) => {
      return window.innerWidth <= RESPONSIVE_BREAKPOINTS.sm ? (
        <>
          <Link to={`${ROUTES.extrinsics}/${record.block}-${record.extrinsicIndex}`}>{value}</Link>
          <div className="cell-secondary">{renderTime(record.time)}</div>
        </>
      ) : value ? (
        <Link to={`${ROUTES.extrinsics}/${record.block}-${record.extrinsicIndex}`}>{value}</Link>
      ) : (
        <span style={{ position: 'absolute', top: '30%', left: '30%' }}>&mdash;</span>
      );
    },
  },
  block: {
    width: 100,
    align: window.innerWidth <= RESPONSIVE_BREAKPOINTS.sm ? 'right' : 'left',
    //eslint-disable-next-line
    render: (value: string, record: any) => {
      return window.innerWidth <= RESPONSIVE_BREAKPOINTS.sm ? (
        <>
          <Link to={`block/${record.block}`}>{value}</Link>
          <div className="cell-secondary">{record.action}</div>
        </>
      ) : (
        <Link to={`block/${record.block}`}>{value}</Link>
      );
    },
  }, //eslint-disable-line
  extrinsicHash: { responsive: ['md'], ellipsis: true },
  extrinsicIndex: { responsive: ['md'], disabled: true },
  time: { responsive: ['md'], width: 180, render: renderTime }, //eslint-disable-line
  action: { responsive: ['md'], width: 180, ellipsis: true },
  data: {
    title: 'Params',
    width: 120,
    render: (val: string): JSX.Element => (
      <Popover title="Show params" placement="topRight" content={<pre>{JSON.stringify(val, null, 2)}</pre>} />
    ),
  },
});

export const transformEventData = (event: Events_events_items): TransformedEventData => {
  const {
    block: { number: block, timestamp: time },
    index,
    extrinsicHash,
    extrinsic,
    module: { name: moduleName },
    eventType: { name: eventName },
    data,
  } = event;
  const key = index >= 0 ? `${block}-${index}` : '';
  return {
    key,
    id: key,
    extrinsicIndex: extrinsic?.index,
    block,
    extrinsicHash,
    time,
    action: `${moduleName}(${eventName})`,
    data,
  };
};
