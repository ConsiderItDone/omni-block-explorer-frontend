/** @jsxImportSource theme-ui */
import React, { useMemo } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { ROUTES } from 'utils/consts';
import { useStyles } from './styles';
//eslint-disable-next-line
const logoConsider = require('images/logo_consider.png');

const getNaivItems = () => {
  let base: Record<string, string> = {
    Blocks: ROUTES.blocks,
    Extrinsics: ROUTES.extrinsics,
    Transfers: ROUTES.transfers,
    Events: ROUTES.events,
    Accounts: ROUTES.accounts,
  };

  const withOmniGraph = Boolean(process.env.REACT_APP_GRAPHQL_ENDPOINT);
  if (withOmniGraph) {
    base = { OmniGraph: ROUTES.omnigraph, ...base };
  }

  return base;
};

export const navigationItems = [
  {
    title: 'Blockchain',
    items: getNaivItems(),
  },
  { title: 'Settings', items: { 'Color Scheme': ROUTES.color_schemes } },
];

export default React.memo(() => {
  const { pathname } = useLocation();
  const styles = useStyles();

  const navigation = useMemo(
    () =>
      navigationItems.map((i) => (
        <div key={i.title}>
          <div className="divider" />
          <h3 className="nav_header nav_header_title">{i.title}</h3>
          {i.items && (
            <ul className="nav_list">
              {Object.keys(i.items).map((k) => (
                <li key={k} className="nav_item">
                  <Link to={i.items[k]} className={pathname.startsWith(i.items[k]) ? 'active' : ''}>
                    {k}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )),
    [pathname],
  );

  return (
    <nav sx={styles.navigation}>
      <div className="logo">
        <Link to="/">
          <img src={process.env.REACT_APP_LOGO_SR} />
        </Link>
      </div>
      <div className="nav_menu">
        <h3 className="nav_header">
          <Link to="/" className={`nav_header_title nav_header ${pathname === '/' ? 'active' : ''}`}>
            Home
          </Link>
        </h3>
        {navigation}
      </div>
      <img className="bottom_logo" src={logoConsider} />
    </nav>
  );
});
