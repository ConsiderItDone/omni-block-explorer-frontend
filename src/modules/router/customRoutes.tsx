import React from 'react';
import { Route } from 'react-router';
import custom from './custom.json';
import { ColumnType } from 'antd/lib/table';
import DynamicTable from 'components/DynamicTable/DynamicTable';

interface RoutesConfig {
  path: string;
  component: React.ReactNode;
}

interface ComponentProps {
  type: 'table';
  columns?: ColumnType<any>[];
  query?: string;
  [key: string]: any;
}

function generateColumns<T = any>(columnData: any[]): ColumnType<T>[] {
  return columnData.map((data, index) => ({
    key: index,
    dataIndex: data.dataIndex,
    title: data.title,
  }));
}

function mapPropToComponent(componentProps: ComponentProps, index: number) {
  switch (componentProps.type) {
    case 'table': {
      return (
        <DynamicTable key={index} columns={generateColumns(componentProps.columns)} query={componentProps.query} />
      );
    }
    default:
      return undefined;
  }
}
type ComponentType = 'table';
interface Component {
  type: ComponentType;
  columns?: ColumnType<any>;
}

interface RouteConfig {
  title: string;
  components: Component;
}

interface NetworkConfig {
  network: string;
  routes: Record<string, RouteConfig>[];
}

function validateRoutesConfig(routeConfig: any): Record<string, RouteConfig>[] {
  const keys = Object.keys(routeConfig);
  const validatedRoutes = [];
  const filtered = keys.filter((key) => {
    const route = routeConfig[key];
    return 'title' in route && route?.components?.length;
  });
  filtered.forEach((key) => validatedRoutes.push(routeConfig[key]));

  return validatedRoutes;
}

function validateCustomConfig(config: any): NetworkConfig {
  const validated = { routes: [] } as NetworkConfig;
  if ('routes' in config) {
    validated.routes = validateRoutesConfig(config.routes);
  }
  if ('network' in config && typeof config.network === 'string') {
    validated.network = config.network;
  }
  return config;
}

export function getNetworkConfig() {
  const validatedConfig = validateCustomConfig(custom);
  return validatedConfig;
}
export function getCustomRoutes(): RoutesConfig[] {
  const config = getNetworkConfig();
  const routes = config.routes ? Object.keys(config.routes) : [];

  return routes.map((route) => ({
    path: route,
    component: <>{config.routes[route].components.map(mapPropToComponent)}</>,
  }));
}

const customRoutes = getCustomRoutes().map((route) => (
  <Route path={route.path} key={route.path} element={route.component} />
));

export default customRoutes;
