import React from 'react';
import { Link } from 'react-router-dom';
import { Extrinsics_extrinsics_items } from 'queries/__generated__/Extrinsics';
import { TransformedExtrinsicData } from './types';
import { RESPONSIVE_BREAKPOINTS, ROUTES } from 'utils/consts';
import { generateColumns } from 'utils/generators';
import { renderTime } from 'utils/elements';
import ImgOk from 'components/icons/ImgOk';
/* eslint-disable @typescript-eslint/no-var-requires */
const imgNok = require('images/nok.png');

const extrinsicTableItem = { id: '', block: '', hash: '', time: '', action: '', success: '' };

export const columns = generateColumns(extrinsicTableItem, {
  id: {
    title: 'Extrinsic ID',
    width: 95,
    ellipsis: true,
    //eslint-disable-next-line
    render: (value: string, record: any) => {
      return window.innerWidth <= RESPONSIVE_BREAKPOINTS.sm ? (
        <>
          <Link to={`/extrinsic/${record.id}`}>{value}</Link>
          <div className="cell-secondary">{renderTime(record?.time)}</div>
        </>
      ) : (
        <Link to={`/extrinsic/${record.id}`}>{value}</Link>
      );
    },
  },
  block: {
    width: 95,
    align: window.innerWidth <= RESPONSIVE_BREAKPOINTS.sm ? 'right' : 'left',
    //eslint-disable-next-line
    render: (value, record: any) => {
      return window.innerWidth <= RESPONSIVE_BREAKPOINTS.sm ? (
        <>
          <Link to={`/block/${record.block}`}>{value}</Link>
          <div className="cell-secondary">{record?.action}</div>
        </>
      ) : (
        <Link to={`/block/${record.block}`}>{value}</Link>
      );
    },
  },
  hash: { responsive: ['md'], title: 'Extrinsic Hash', ellipsis: true },
  time: { responsive: ['md'], render: renderTime }, //eslint-disable-line
  action: {
    responsive: ['md'],
    ellipsis: true,
    //eslint-disable-next-line
    render: (val: string, record: any) => (
      <Link to={`${ROUTES.extrinsics}?module=${record.callModule}&event=${record.callModuleFunction}`}>{val}</Link>
    ),
  },
  success: {
    title: window?.innerWidth < RESPONSIVE_BREAKPOINTS.sm ? '' : 'Result',
    width: window?.innerWidth < RESPONSIVE_BREAKPOINTS.sm ? 25 : 45,
    align: 'right',
    render: (success) => (success ? <ImgOk /> : <img src={imgNok} alt="Unsuccessfull" />),
  },
});

export const transformExtrinsicData = (extrinsic: Extrinsics_extrinsics_items): TransformedExtrinsicData => {
  const {
    block: { number: block, timestamp: time },
    index,
    hash,
    success,
    module,
    extrinsicType,
  } = extrinsic;
  const key = `${block}-${index}`;
  return {
    key,
    id: key,
    block,
    hash,
    success,
    time,
    action: `${module?.name || 'Empty'}(${extrinsicType?.name || 'empty'})`,
    callModule: module?.name,
    callModuleFunction: extrinsicType?.name,
  };
};

export const blockExtrinsics = columns
  .filter((c) => c.title !== 'Block')
  .map((c) => {
    switch (c.title) {
      case 'Extrinsic Hash':
        return { ...c, responsive: undefined, render: columns.find((col) => col.title === 'Block').render };
      default:
        return c;
    }
  });
