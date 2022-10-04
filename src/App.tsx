/** @jsxImportSource theme-ui */
import React, { FC, Suspense, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Spin } from 'antd';
import { Global } from '@emotion/react';
import { Header, Navigation, Overlay } from 'components';
import { routedLayouts } from './modules/router';
import { RESPONSIVE_BREAKPOINTS } from 'utils/consts';
import ConfigProvider from './modules/providers/config';
import { ThemeProvider } from 'theme-ui';
import { getTheme } from './themes';
import { getGlobalStyles } from './styles';
import { useAppInit } from 'utils/hooks';
import { getCustomRoutes } from './modules/router/customRoutes';
import AppLoader from 'components/AppLoader/AppLoader';

const loadingNode = (
  <div className="spin-container">
    <Spin size="large" />
  </div>
);

const App: FC = () => {
  const theme = getTheme(process.env.REACT_APP_PRIMARY_COLOR || 'steelblue');
  const { config, loading } = useAppInit(process.env.REACT_APP_CONFIG_URL);

  const customRoutes = useMemo(() => {
    return getCustomRoutes(config);
  }, [config]);

  return (
    <ThemeProvider theme={theme}>
      <ConfigProvider value={config}>
        {loading ? (
          <AppLoader />
        ) : (
          <Overlay>
            <div className="layout">
              {window.innerWidth > RESPONSIVE_BREAKPOINTS.tablet && <Navigation />}
              <main>
                <Header />
                <Suspense fallback={loadingNode}>
                  <Routes>
                    {routedLayouts}
                    {customRoutes}
                    <Route element={<div>404</div>} />
                  </Routes>
                </Suspense>
              </main>
            </div>
          </Overlay>
        )}
      </ConfigProvider>
      <Global styles={getGlobalStyles} />
    </ThemeProvider>
  );
};

export default App;
