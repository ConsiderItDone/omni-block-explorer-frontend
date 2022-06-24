/** @jsxImportSource theme-ui */
import React, { FC, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Spin } from 'antd';

import { Header, Navigation, Overlay } from 'components';
import { routedLayouts } from './modules/router';
import { RESPONSIVE_BREAKPOINTS } from 'utils/consts';
import { ThemeProvider } from 'theme-ui';
import { getTheme } from './themes';
import { Global } from '@emotion/react';
import { getGlobalStyles } from './styles';

const loadingNode = (
  <div className="spin-container">
    <Spin size="large" />
  </div>
);

const App: FC = () => {
  const theme = getTheme(process.env.REACT_APP_PRIMARY_COLOR || 'steelblue');

  return (
    <ThemeProvider theme={theme}>
      <Overlay>
        <div className="layout">
          {window.innerWidth > RESPONSIVE_BREAKPOINTS.tablet && <Navigation />}
          <main>
            <Header />
            <Suspense fallback={loadingNode}>
              <Routes>
                {routedLayouts}
                <Route element={<div>404</div>} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </Overlay>
      <Global styles={getGlobalStyles} />
    </ThemeProvider>
  );
};

export default App;
