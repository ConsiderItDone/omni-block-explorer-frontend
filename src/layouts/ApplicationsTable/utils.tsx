import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from 'utils/consts';
import { normalizeCurrency } from 'utils/funcs';
import { Applications_applications_items } from 'queries/__generated__/Applications';
import { generateColumns } from 'utils/generators';

const applicationTableItemObj = {
  candidate: true,
  candidateDeposit: true,
  metadata: true,
  challenger: true,
  challengerDeposit: true,
  createdBlock: true,
  challengedBlock: true,
  status: true,
};

export const columns = generateColumns(applicationTableItemObj, {
  candidate: {
    ellipsis: true,
    render: (val: string): JSX.Element => <Link to={`${ROUTES.accounts}/${val}`}>{val}</Link>,
  },
  candidateDeposit: { title: 'Candidate Deposit', responsive: ['md'], render: (value) => normalizeCurrency(value) },
  metadata: { responsive: ['md'], ellipsis: true },
  challenger: {
    ellipsis: true,
    responsive: ['md'],
    render: (val: string): JSX.Element => <Link to={`${ROUTES.accounts}/${val}`}>{val}</Link>,
  },
  challengerDeposit: { title: 'Challenger Deposit', responsive: ['md'], render: (value) => normalizeCurrency(value) },
  votesFor: {
    title: 'Votes for',
  },
  votersFor: {
    title: 'Voters For',
    responsive: ['md'],
    ellipsis: true,
    //eslint-disable-next-line
    render: (val: any) => JSON.stringify(val),
  },
  votesAgainst: {
    title: 'Votes against',
  },
  votersAgainst: {
    title: 'Voters Against',
    responsive: ['md'],
    ellipsis: true,
    //eslint-disable-next-line
    render: (val: any) => JSON.stringify(val),
  },
  createdBlock: {
    title: 'Created Block',
    responsive: ['md'],
    render: (val: string): JSX.Element => <Link to={`${ROUTES.blocks}/${val}`}>{val}</Link>,
  },
  challengedBlock: {
    title: 'Challenged Block',
    responsive: ['md'],
    render: (val: string): JSX.Element => <Link to={`${ROUTES.blocks}/${val}`}>{val}</Link>,
  },
});
//eslint-disable-next-line
export const transformApplicationData = (application: Applications_applications_items) => {
  return { ...application, candidate: application?.candidate?.address, challenger: application?.challenger?.address };
};
