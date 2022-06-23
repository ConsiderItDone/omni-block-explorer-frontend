import { Accounts_accounts_items } from 'queries/__generated__/Accounts';
import React from 'react';
import { Link } from 'react-router-dom';
import { RESPONSIVE_BREAKPOINTS, ROUTES } from 'utils/consts';
import { normalizeCurrency } from 'utils/funcs';
import { generateColumns } from 'utils/generators';
import { Balance, balanceTableItemObj } from 'types';

export interface AccountRenderProps extends Balance {
  key?: string;
  address: string;
}

export const accountTableItemObj: AccountRenderProps = {
  address: '',
  ...balanceTableItemObj,
};

export const columns = generateColumns(accountTableItemObj, {
  address: { ellipsis: true, render: (val: string) => <Link to={`${ROUTES.accounts}/${val}`}>{val}</Link> },
  free: {
    align: 'right',
    ellipsis: true,
    width: window.innerWidth <= RESPONSIVE_BREAKPOINTS.md ? 100 : 150,
    render: (value) => normalizeCurrency(value),
  },
  reserved: { responsive: ['md'], align: 'right', width: 150, render: (value) => normalizeCurrency(value) },
  feeFrozen: {
    title: 'Fee Frozen',
    align: 'right',
    responsive: ['md'],
    width: 150,
    render: (value) => normalizeCurrency(value),
  },
  miscFrozen: {
    title: 'Misc Frozen',
    align: 'right',
    responsive: ['md'],
    width: 150,
    render: (value) => normalizeCurrency(value),
  },
});

export const transformAccountData = (account: Accounts_accounts_items): AccountRenderProps => {
  const { address, balance } = account;
  const { feeFrozen, free, miscFrozen, reserved } = balance || {
    feeFrozen: null,
    free: null,
    miscFrozen: null,
    reserved: null,
  };
  return {
    key: address,
    address,
    free,
    feeFrozen,
    miscFrozen,
    reserved,
  };
};
