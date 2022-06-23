import React from 'react';
import { Validators_validators_items } from 'queries/__generated__/Validators';
import { Link } from 'react-router-dom';
import { RESPONSIVE_BREAKPOINTS, ROUTES } from 'utils/consts';
import { normalizeCurrency } from 'utils/funcs';
import { generateColumns } from 'utils/generators';

export interface ValidatorRenderProps {
  key?: string; // antd table row key
  address: string;
  consumers: number;
  providers: number;
  free?: number | string;
  feeFrozen?: number | string;
  miscFrozen?: number | string;
  reserved?: number | string;
}
const validatorTableItemObj: ValidatorRenderProps = {
  address: '',
  consumers: 0,
  providers: 0,
  free: 0,
  feeFrozen: 0,
  miscFrozen: 0,
  reserved: 0,
};
const validatorTableItemObjHome = {
  address: '',
};
export const columns = generateColumns(validatorTableItemObj, {
  address: { ellipsis: true, render: (val: string) => <Link to={`${ROUTES.accounts}/${val}`}>{val}</Link> },
  consumers: { responsive: ['md'], width: 150 },
  providers: { responsive: ['md'], width: 150 },
  free: {
    width: window.innerWidth <= RESPONSIVE_BREAKPOINTS.md ? 100 : 150,
    render: (value) => normalizeCurrency(value),
  },
  reserved: { responsive: ['md'], width: 150, render: (value) => normalizeCurrency(value) },
  feeFrozen: { title: 'Fee Frozen', responsive: ['md'], width: 150, render: (value) => normalizeCurrency(value) },
  miscFrozen: { title: 'Misc Frozen', responsive: ['md'], width: 150, render: (value) => normalizeCurrency(value) },
});

export const columnsMini = generateColumns(validatorTableItemObjHome, {
  address: { title: 'Validator', ellipsis: true },
});

export const transformValidatorData = (validator: Validators_validators_items): ValidatorRenderProps => {
  const { consumers, providers, account } = validator;
  const { address, balance } = account;
  const { feeFrozen, free, miscFrozen, reserved } = balance || {
    feeFrozen: null,
    free: null,
    miscFrozen: null,
    reserved: null,
  };
  return {
    key: address,
    consumers,
    providers,
    address,
    free,
    feeFrozen,
    miscFrozen,
    reserved,
  };
};
