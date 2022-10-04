import React from 'react';
import { Route } from 'react-router';
import { NetworkConfig, validateCustomConfig } from 'utils/configUtils';
import DynamicComponent from 'components/Dynamic';

export async function getNetworkConfig(url: string): Promise<NetworkConfig> {
  const response = await fetch(url);
  const config = await response.json();

  const validatedConfig = validateCustomConfig(config);
  return validatedConfig;
}

export function getCustomRoutes(config: NetworkConfig): JSX.Element[] {
  const routes = config?.routes ? Object.keys(config.routes) : [];

  const routesData = routes.map((route) => ({
    path: route,
    component: (
      <>
        {config.routes[route].components.map((props, index) => (
          <DynamicComponent {...props} key={index} />
        ))}
      </>
    ),
  }));

  return routesData.map((route) => <Route path={route.path} key={route.path} element={route.component} />);
}
