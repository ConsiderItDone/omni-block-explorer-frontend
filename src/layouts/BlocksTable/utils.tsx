import React from 'react';
import { Link } from 'react-router-dom';
import { Blocks_blocks_items } from 'queries/__generated__/Blocks';

import { RESPONSIVE_BREAKPOINTS, ROUTES } from 'utils/consts';
import { TransformedBlockItem } from './types';
import { generateColumns } from 'utils/generators';
import { renderTime } from 'utils/elements';
import { HomePage_blocks_items } from 'queries/__generated__/HomePage';
import { NewBlocks_newBlock } from 'queries/__generated__/NewBlocks';
import ImgOk from 'components/icons/ImgOk';
/* eslint-disable @typescript-eslint/no-var-requires */
const imgPending = require('images/pending.png');

const blockTableItem = {
  number: '',
  timestamp: '',
  extrinsics: 0,
  events: 0,
  hash: '',
  finalized: true,
};
const blockTableItemHome = {
  number: '',
  extrinsics: 0,
  events: 0,
  timestamp: '',
  finalized: true,
};
export const columns = generateColumns(blockTableItem, {
  number: {
    title: 'Block',
    width: 100,
    render: (value, record) =>
      window.innerWidth <= 767 ? (
        <>
          <Link to={`${value}`}>{value}</Link>
          <div className="cell-secondary">{renderTime(record?.timestamp)}</div>
        </>
      ) : (
        <Link to={`${value}`}>{value}</Link>
      ),
  },
  timestamp: { responsive: ['md'], width: 150, ellipsis: true, render: renderTime }, //eslint-disable-line
  extrinsics: {
    width: 75,
    //eslint-disable-next-line
    render: (val: any, record: any) => <Link to={`${ROUTES.blocks}/${record?.number}?tab=extrinsics`}>{val}</Link>,
  },
  events: {
    width: 75,
    //eslint-disable-next-line
    render: (val: any, record: any) => <Link to={`${ROUTES.blocks}/${record?.number}?tab=events`}>{val}</Link>,
  },
  hash: { responsive: ['md'], width: 'auto', ellipsis: true },
  finalized: {
    width: 45,
    title: 'Status',
    align: 'center',
    render: (val) => (val ? <ImgOk /> : <img src={imgPending} alt="status" />),
  },
});

export const columnsMini = generateColumns(blockTableItemHome, {
  number: {
    title: 'Block',
    width: 90,
    ellipsis: true,
    render: (value: string, { timestamp }: { timestamp: string }) =>
      window.innerWidth <= RESPONSIVE_BREAKPOINTS.md ? (
        <>
          <Link to={`block/${value}`}>{value}</Link>
          <div className="cell-secondary">{renderTime(timestamp, false)}</div>
        </>
      ) : (
        <Link to={`block/${value}`}>{value}</Link>
      ),
  },
  extrinsics: {
    title: 'Extrinsic',
    width: 75,
    //eslint-disable-next-line
    render: (val: any, record: any) => <Link to={`${ROUTES.blocks}/${record?.number}?tab=extrinsics`}>{val}</Link>,
  },
  events: {
    title: 'Event',
    width: 75,
    //eslint-disable-next-line
    render: (val: any, record: any) => <Link to={`${ROUTES.blocks}/${record?.number}?tab=events`}>{val}</Link>,
  },
  timestamp: { width: 120, ellipsis: true, render: renderTime, responsive: ['md'] },
  finalized: {
    title: 'Status',
    width: 45,
    align: 'right',
    render: (val) => (val ? <ImgOk /> : <img src={imgPending} alt="status" />),
  },
});

export const transformBlockItem = (
  block: Blocks_blocks_items | HomePage_blocks_items | NewBlocks_newBlock,
): TransformedBlockItem => {
  const { number, timestamp, hash, finalized, extrinsics, events } = block;
  return {
    key: number,
    number,
    timestamp,
    hash,
    finalized,
    extrinsics: extrinsics.length,
    events: events.length,
  };
};
