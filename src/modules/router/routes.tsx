import React, { lazy } from 'react';
import { Route } from 'react-router';

import { ROUTES } from 'utils/consts';

const Home = lazy(() => import('../../layouts/Home/Home'));
const BlocksTable = lazy(() => import('../../layouts/BlocksTable/BlocksTable'));
const BlockDetails = lazy(() => import('../../layouts/BlockDetails/BlockDetails'));
const Accounts = lazy(() => import('../../layouts/AccountsTable/AccountsTable'));
const AccountDetails = lazy(() => import('../../layouts/AccountDetails/AccountDetails'));
const TransfersTable = lazy(() => import('../../layouts/TransfersTable/TransfersTable'));
const ExtrinsicsTable = lazy(() => import('../../layouts/ExtrinsicsTable/ExtrinsicsTable'));
const ExtrinsicsDetails = lazy(() => import('../../layouts/ExtrinsicsDetails/ExtrinsicsDetails'));
const Events = lazy(() => import('../../layouts/EventsTable/EventsTable'));
const TransferDetails = lazy(() => import('../../layouts/TransferDetails/TransferDetails'));
const OmniGraph = lazy(() => import('../../layouts/OmniGraph/OmniGraph'));
const ColorScheme = lazy(() => import('../../layouts/ColorScheme/ColorScheme'));

const routedComponents = [
  {
    component: Home,
    path: '/',
  },
  {
    component: BlocksTable,
    path: `${ROUTES.blocks}`,
  },
  {
    component: BlockDetails,
    path: `${ROUTES.blocks}/:id`,
  },
  {
    component: Accounts,
    path: `${ROUTES.accounts}`,
  },
  {
    component: AccountDetails,
    path: `${ROUTES.accounts}/:accountAddress`,
  },
  {
    component: TransfersTable,
    path: `${ROUTES.transfers}`,
  },
  {
    component: ExtrinsicsTable,
    path: `${ROUTES.extrinsics}`,
  },
  {
    component: ExtrinsicsDetails,
    path: `${ROUTES.extrinsics}/:id`,
  },
  {
    component: Events,
    path: `${ROUTES.events}`,
  },
  {
    component: TransferDetails,
    path: `${ROUTES.transfers}/:id`,
  },
  {
    component: ColorScheme,
    path: `${ROUTES.color_schemes}`,
  },
];
const withOmniGraph = process.env.REACT_APP_GRAPHQL_ENDPOINT?.length > 0;

if (withOmniGraph) {
  routedComponents.push({
    component: OmniGraph,
    path: `${ROUTES.omnigraph}`,
  });
}

export default routedComponents.map((layout) => (
  <Route path={layout.path} key={layout.path} element={<layout.component />} />
));
