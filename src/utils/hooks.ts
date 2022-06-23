import { NavigateFunction, useLocation, useNavigate } from 'react-router';
import queryString from 'query-string';
import { ApolloError } from '@apollo/client';
import { useEffect } from 'react';
import { notification } from 'antd';

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

export { useChart } from '../charts/useChart';
