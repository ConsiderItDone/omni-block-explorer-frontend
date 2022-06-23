import React from 'react';
import { Allocations_events_items } from 'queries/__generated__/Allocations';
import { RESPONSIVE_BREAKPOINTS, ROUTES } from 'utils/consts';
import { generateColumns } from 'utils/generators';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { normalizeCurrency } from 'utils/funcs';
import { renderTime } from 'utils/elements';

//eslint-disable-next-line
export const transformAllocationData = (allocation: Allocations_events_items) => {
  const {
    block: { number, timestamp },
    extrinsic,
    data,
  } = allocation;
  const address = extrinsic?.signer?.address || '';
  if (typeof data === 'object') {
    return {
      key: timestamp + data?.value,
      sender: address,
      receiver: data?.who,
      amount: data?.value,
      protocolFee: data?.fee,
      time: timestamp,
      block: number,
      proof: data?.proof,
    };
  }
  return {
    key: timestamp + data[1],
    sender: address,
    receiver: data[0],
    amount: data[1],
    protocolFee: data[2],
    time: timestamp,
    block: number,
    proof: data[3] || '',
  };
};

const allocationTableObj = {
  sender: true,
  receiver: true,
  time: true,
  amount: true,
  protocolFee: true,
  proof: true,
  block: true,
};

const allocationTableObjHome = {
  block: true,
  receiver: true,
  time: true,
  amount: true,
};

export const columnsMini = generateColumns(allocationTableObjHome, {
  amount: {
    title: 'Value',
    render: (val: string, record: { block: string | number }) => {
      return window.innerWidth <= RESPONSIVE_BREAKPOINTS.md ? (
        <>
          {normalizeCurrency(val)}
          <div className="cell-secondary">Block {record?.block}</div>
        </>
      ) : (
        normalizeCurrency(val)
      );
    },
    align: 'right',
    width: 100,
    ellipsis: true,
  },
  time: { responsive: ['md'], render: renderTime, width: 120, ellipsis: true },
  receiver: {
    render: (val, record) => {
      return window.innerWidth <= RESPONSIVE_BREAKPOINTS.md ? (
        <>
          <Link to={`${ROUTES.accounts}/${val}`}>{val}</Link>
          <div className="cell-secondary">{renderTime(record?.time, false)}</div>
        </>
      ) : (
        <Link to={`${ROUTES.accounts}/${val}`}>{val}</Link>
      );
    },
    ellipsis: true,
  },
  block: {
    responsive: ['md'],
    width: 90,
    ellipsis: true,
    render: (val) => <Link to={`${ROUTES.blocks}/${val}`}>{val}</Link>,
  },
});

export const columns = generateColumns(allocationTableObj, {
  sender: {
    title: 'From',
    responsive: ['md'],
    ellipsis: true,
    render: (val) => <Link to={`${ROUTES.accounts}/${val}`}>{val}</Link>,
  },
  amount: {
    title: 'Value',
    align: window.innerWidth <= RESPONSIVE_BREAKPOINTS.md ? 'right' : 'left',
    render: (val, record) => {
      const base = normalizeCurrency(val);
      return window.innerWidth <= RESPONSIVE_BREAKPOINTS.md ? (
        <>
          {base}
          <div className="cell-secondary">Block {record?.block}</div>
        </>
      ) : (
        base
      );
    },
  },
  protocolFee: { responsive: ['md'], title: 'Protocol Fee', render: (val) => normalizeCurrency(val) },
  time: { responsive: ['md'], render: (val) => moment(val).fromNow() },
  proof: { responsive: ['md'], ellipsis: true },
  receiver: {
    title: 'To',
    ellipsis: true,
    render: (val, record) => {
      const base = <Link to={`${ROUTES.accounts}/${val}`}>{val}</Link>;
      return window.innerWidth <= RESPONSIVE_BREAKPOINTS.md ? (
        <>
          {base}
          <div className="cell-secondary">{renderTime(record?.time)}</div>
        </>
      ) : (
        base
      );
    },
  },
  block: {
    responsive: ['md'],
    render: (val) => <Link to={`${ROUTES.blocks}/${val}`}>{val}</Link>,
  },
});
