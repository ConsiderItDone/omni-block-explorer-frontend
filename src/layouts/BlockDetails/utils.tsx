import React from 'react';
import { Link } from 'react-router-dom';

import { Block_blockByHash_events, Block_blockByHash_logs } from 'queries/__generated__/Block';
import { ROUTES } from 'utils/consts';
import { TransformedEventData, TransformedLogData } from './types';
import { generateColumns } from 'utils/generators';
import { ExtrinsicsDetails_extrinsicById_events } from 'queries/__generated__/ExtrinsicsDetails';
import Popover from 'components/Popover/Popover';

const eventTableItem = {
  id: true,
  hash: '',
  action: '',
  data: '',
};
export const eventColumns = generateColumns(eventTableItem, {
  id: { title: 'Extrinsic ID', width: 150, ellipsis: true },
  hash: { responsive: ['md'], ellipsis: true },
  action: {
    ellipsis: true,
    //eslint-disable-next-line
    render: (val: string, record: any): JSX.Element => (
      <Link to={`${ROUTES.events}?module=${record.moduleName}&event=${record.eventName}`}>{val}</Link>
    ),
  },
  data: {
    title: 'Params',
    width: 120,
    //eslint-disable-next-line
    render: (val: string): JSX.Element => (
      <Popover title="Show params" placement="topRight" content={<pre>{JSON.stringify(val, null, 2)}</pre>} />
    ),
  },
});

const logTableItem = {
  id: '',
  type: '',
};
export const logsColumns = generateColumns(logTableItem, { id: { title: 'Log Index' } });

export const transformEventData = (
  blockNumber: number | string,
  event: Block_blockByHash_events | ExtrinsicsDetails_extrinsicById_events,
): TransformedEventData => {
  const {
    index,
    extrinsicHash,
    data,
    module: { name: moduleName },
    eventType: { name: eventName },
  } = event;
  return {
    key: `${blockNumber}-${index}`,
    id: `${blockNumber}-${index}`,
    hash: extrinsicHash,
    action: `${moduleName}(${eventName})`,
    moduleName,
    eventName,
    data,
  };
};

export const transformLogData = (blockNumber: number, log: Block_blockByHash_logs): TransformedLogData => {
  const { index, type } = log;
  return {
    key: index,
    id: `${blockNumber}-${index}`,
    block: blockNumber,
    type,
  };
};
