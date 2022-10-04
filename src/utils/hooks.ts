import { useContext, useEffect, useState } from 'react';
import { NavigateFunction, useLocation, useNavigate } from 'react-router';
import { ApolloError } from '@apollo/client';
import queryString from 'query-string';
import { notification } from 'antd';

import { getNetworkConfig } from '../modules/router/customRoutes';
import { ConfigContext } from '../modules/providers/config';
import { NetworkConfig } from './configUtils';

export const useRouter = (): {
  search: string;
  pathname: string;
  navigate: NavigateFunction;
  queryObj: any;
  skip: number;
} => {
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const queryObj = queryString.parse(search);
  const skip = (queryObj?.page && Number(queryObj?.page) * 10 - 10) || 0; // returns skip value for querying table data
  return { search, pathname, navigate, queryObj, skip };
};
export const useErrorDisaply = (error: ApolloError) => {
  useEffect(() => {
    if (error) {
      notification.error({ message: error?.name, description: error?.message });
      console.log(JSON.stringify(error));
    }
  }, [error]);
};

interface AppInitializationProps {
  config: NetworkConfig | null;
  loading: boolean;
  error: Error | null;
}

export const useAppInit = (url?: string): AppInitializationProps => {
  const [state, setState] = useState<AppInitializationProps>({
    loading: true,
    config: null,
    error: null,
  });

  useEffect(() => {
    getNetworkConfig(url)
      .then((config) => setState({ loading: false, config: config, error: null }))
      .catch((e) => {
        notification['error']({ message: e });
        setState({ loading: false, config: null, error: e });
      });
  }, [url]);

  return state;
};

export const useAppConfig = () => {
  return useContext(ConfigContext);
};

export { useChart } from '../charts/useChart';
