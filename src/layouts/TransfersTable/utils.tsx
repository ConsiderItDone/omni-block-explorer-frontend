/* eslint-disable */
import React from 'react';
import { Transfers_events_items } from 'queries/__generated__/Transfers';
import { Link } from 'react-router-dom';
import { RESPONSIVE_BREAKPOINTS, ROUTES } from 'utils/consts';
import { normalizeCurrency } from 'utils/funcs';
import { TransferRenderProps } from './types';
import { generateColumns } from 'utils/generators';
import { transferDataTransformer } from 'utils/adapters';
import { renderTime } from 'utils/elements';

export const transformTransferData = (event: Transfers_events_items): TransferRenderProps => {
  const {
    data,
    extrinsic: {
      index: extrinsicIndex,
      hash,
      block: { number, timestamp },
    },
    index: eventIndex,
  } = event;

  const { from, to, value } = transferDataTransformer(data);
  return {
    key: hash,
    transferId: `${number}-${extrinsicIndex}-${eventIndex}`,
    block: parseInt(number),
    from,
    to,
    value,
    hash,
    time: timestamp,
  };
};

const transferTableItem = {
  transferId: '',
  block: '',
  from: '',
  to: '',
  time: '',
  value: '',
};
export const columns = generateColumns(transferTableItem, {
  transferId: {
    title: 'Transfer ID',
    render: (val: string, record: any): JSX.Element => {
      const base = <Link to={`${ROUTES.transfers}/${val}`}>{val}</Link>;
      return window.innerWidth <= RESPONSIVE_BREAKPOINTS.md ? (
        <>
          {base}
          <div className="cell-secondary">{renderTime(record.time)}</div>
        </>
      ) : (
        base
      );
    },
  },
  block: {
    responsive: ['md'],
    render: (val: string): JSX.Element => <Link to={`${ROUTES.blocks}/${val}`}>{val}</Link>,
  },
  from: {
    ellipsis: true,
    responsive: ['md'],
    render: (val: string): JSX.Element => <Link to={`${ROUTES.accounts}/${val}`}>{val}</Link>,
  },
  to: {
    ellipsis: true,
    responsive: ['md'],
    render: (val: string): JSX.Element => <Link to={`${ROUTES.accounts}/${val}`}>{val}</Link>,
  },
  value: {
    align: 'right',
    ellipsis: true,
    render: (val: any, record: any) => {
      return window.innerWidth <= RESPONSIVE_BREAKPOINTS.md ? (
        <>
          {normalizeCurrency(val)}
          <div className="cell-secondarycombined-2">
            <div className="ellipsis">
              {record?.from} {'>'} {record?.to}
            </div>
          </div>
        </>
      ) : (
        normalizeCurrency(val)
      );
    },
  },
  time: {
    responsive: ['md'],
    ellipsis: true,
    render: renderTime,
  },
});
export const columnsMini = columns
  .filter((c: any) => c.key !== 'block')
  .map((c) => {
    switch (c.key) {
      case 'time':
        return { ...c, render: (val: any) => renderTime(val) };
      case 'transferId':
        return window.innerWidth <= RESPONSIVE_BREAKPOINTS.md
          ? {
              ...c,
              render: (value: string, { time }: { time: string }) => (
                <>
                  <Link to={`${ROUTES.transfers}/${value}`}>{value}</Link>
                  <div className="cell-secondary">{renderTime(time, false)}</div>
                </>
              ),
            }
          : { ...c };
      case 'value':
        return window.innerWidth <= RESPONSIVE_BREAKPOINTS.md
          ? {
              ...c,
              width: '60%',
              render: (val: string, record: { from: string; to: string; value: string }) => (
                <>
                  <div>{normalizeCurrency(val)}</div>
                  <div className="cell-secondary combined-2">
                    <div className="ellipsis">
                      <Link to={`${ROUTES.accounts}/${record?.from}`}>From {record?.from}</Link>
                    </div>
                    <div className="ellipsis">
                      <Link to={`${ROUTES.accounts}/${record?.to}`}>To {record?.to}</Link>
                    </div>
                  </div>
                </>
              ),
            }
          : { ...c };
      case 'from':
      case 'to':
        return window.innerWidth <= RESPONSIVE_BREAKPOINTS.tablet ? { ...c, responsive: [1024] } : c;
      default:
        return c;
    }
  });

interface TransferFilterParams {
  from?: string;
  to?: string;
  skip?: number;
}
interface TransferQueryParams {
  skip?: number;
  filters?: { from?: string; to?: string };
}

export const generateQueryVars = ({ from, to, skip }: TransferFilterParams): TransferQueryParams => {
  const res: { skip?: number; filters?: { from?: string; to?: string } } = {};
  if (skip) res.skip = skip;
  if (from || to) res.filters = {};
  if (from) res.filters.from = from;
  if (to) res.filters.to = to;
  return res;
};
