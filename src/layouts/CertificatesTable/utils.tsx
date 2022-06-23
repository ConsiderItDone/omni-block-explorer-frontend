import React from 'react';
import { Link } from 'react-router-dom';
import { RESPONSIVE_BREAKPOINTS, ROUTES } from 'utils/consts';
import { generateColumns } from 'utils/generators';
import { RootCertificates_rootCertificates_items } from 'queries/__generated__/RootCertificates';
const certificateTableItem = {
  owner: '',
  key: '',
  revoked: true,
  childRevocations: true,
  created: '',
  renewed: '',
  validity: '',
};
export const columns = generateColumns(certificateTableItem, {
  owner: { ellipsis: true, render: (val: string): JSX.Element => <Link to={`${ROUTES.accounts}/${val}`}>{val}</Link> },
  key: {
    align: window.innerWidth <= RESPONSIVE_BREAKPOINTS.md ? 'right' : 'left',
    render: (val: string): JSX.Element => <Link to={`${ROUTES.accounts}/${val}`}>{val}</Link>,
  },
  revoked: { width: 100, responsive: ['md'], render: (value: boolean): string => (value ? 'True' : 'False') },
  childRevocations: {
    title: 'Child Revocations',
    responsive: ['md'],
    ellipsis: true,
    //eslint-disable-next-line
    render: (val: any) => JSON.stringify(val),
  },
  created: {
    title: 'Created Block',
    responsive: ['md'],
    render: (val: string): JSX.Element => <Link to={`${ROUTES.blocks}/${val}`}>{val}</Link>,
  },
  renewed: {
    title: 'Renewed Block',
    responsive: ['md'],
    render: (val: string): JSX.Element => <Link to={`${ROUTES.blocks}/${val}`}>{val}</Link>,
  },
  validity: {
    responsive: ['md'],
  },
});

//eslint-disable-next-line
export const transformCertificate = (certificate: RootCertificates_rootCertificates_items) => {
  return { ...certificate, owner: certificate?.owner?.address, key: certificate?.key?.address };
};
