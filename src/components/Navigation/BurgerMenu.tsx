/** @jsxImportSource theme-ui */
import React, { useContext, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getNavigationItems } from '../Navigation/Navigation';
import { Button } from 'antd';
import { useAppConfig, useRouter } from 'utils/hooks';
import { OverlayContext } from 'components/Overlay/Overlay';
import { useStyles } from './styles';

export default React.memo(() => {
  const overlayContext = useContext(OverlayContext);
  const { setOverlayActive } = overlayContext;
  const { pathname } = useRouter();

  const styles = useStyles();

  const config = useAppConfig();

  const navigationItems = getNavigationItems(config?.network, config?.routes);

  const navigation = useMemo(
    () => (
      <nav className="mobile" sx={styles.mobileNav} onClick={(e) => e.stopPropagation()}>
        <div className="logo">
          <Link to="/" onClick={() => setOverlayActive(false)}>
            <img src={process.env.REACT_APP_LOGO_SRC} />
          </Link>
        </div>
        <div className="nav_menu">
          <h3 className="nav_header">
            <Link
              to="/"
              className={`nav_header ${pathname === '/' ? 'active' : ''}`}
              onClick={() => setOverlayActive(false)}
            >
              Home
            </Link>
          </h3>
          {navigationItems.map((i) => (
            <>
              <div className="divider" />
              <h3 className="nav_header">{i.title}</h3>
              {i.items && (
                <ul className="nav_list">
                  {Object.keys(i.items).map((k) => (
                    <li key={k} className="nav_item">
                      <Link
                        onClick={() => setOverlayActive(false)}
                        to={i.items[k]}
                        className={pathname.startsWith(i.items[k]) ? 'active' : ''}
                      >
                        {k}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </>
          ))}
        </div>
      </nav>
    ),
    [pathname],
  );

  useEffect(() => {
    overlayContext.setOverlayItem(navigation);
  }, [pathname]);

  return (
    <>
      <Button
        className="burger-btn"
        sx={styles.burger}
        onClick={() => {
          overlayContext.setOverlayActive(true);
        }}
      >
        <div />
        <div />
        <div />
      </Button>
    </>
  );
});
