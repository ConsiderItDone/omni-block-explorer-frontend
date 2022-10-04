/** @jsxImportSource theme-ui */
import React, { useMemo } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { ROUTES } from 'utils/consts';
import { useStyles } from './styles';
import { useAppConfig } from 'utils/hooks';
import { RouteConfig } from 'utils/configUtils';
//eslint-disable-next-line
const logoConsider = require('images/logo_consider.png');

function getCustomNavigation(title: string, customRoutes: Record<string, RouteConfig>) {
  const routes = customRoutes ? Object.keys(customRoutes) : [];
  const navItems = {};

  routes.forEach((path) => {
    const route = customRoutes[path];
    navItems[route?.title || path] = '/' + path;
  });

  if (!routes.length) return {};

  return {
    title: title,
    items: navItems,
  };
}

export const getNavigationItems = (title?: string, customRoutes?: Record<string, RouteConfig>) => {
  const base = {
    title: 'Blockchain',
    items: {
      Blocks: ROUTES.blocks,
      Extrinsics: ROUTES.extrinsics,
      Transfers: ROUTES.transfers,
      Events: ROUTES.events,
      Accounts: ROUTES.accounts,
    } as Record<string, string>,
  };

  const withOmniGraph = process.env.REACT_APP_GRAPHQL_ENDPOINT?.length > 0;
  if (withOmniGraph) {
    base.items = { OmniGraph: ROUTES.omnigraph, ...base.items };
  }

  const custom = title && customRoutes ? getCustomNavigation(title, customRoutes) : {};

  const settings = { title: 'Settings', items: { 'Color Scheme': ROUTES.color_schemes } };

  return [base, custom, settings].filter((i) => i.title && Object.keys(i.items).length);
};

export default React.memo(() => {
  const { pathname } = useLocation();
  const config = useAppConfig();
  const navigationItems = getNavigationItems(config?.network, config?.routes);

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
