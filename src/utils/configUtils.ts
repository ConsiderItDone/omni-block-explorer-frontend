import { ColumnType } from 'antd/lib/table';

export type ComponentType = 'table';
export interface Component {
  type: ComponentType;
  columns?: ColumnType<any>[];
}

export interface RouteConfig {
  title: string;
  components: Component[];
}

export interface NetworkConfig {
  network: string;
  routes: Record<string, RouteConfig>;
}

export function validateRoutesConfig(routeConfig: any): Record<string, RouteConfig> {
  const keys = Object.keys(routeConfig);
  const validatedRoutes = {};

  const filtered = keys.filter((key) => {
    const route = routeConfig[key];
    return 'title' in route && route?.components?.length;
  });

  filtered.forEach((key) => (validatedRoutes[key] = routeConfig[key]));

  return validatedRoutes;
}

export function validateCustomConfig(config: any): NetworkConfig {
  const validated = { routes: {} } as NetworkConfig;
  if ('routes' in config) {
    validated.routes = validateRoutesConfig(config.routes);
  }
  if ('network' in config && typeof config.network === 'string') {
    validated.network = config.network;
  }

  return config;
}
