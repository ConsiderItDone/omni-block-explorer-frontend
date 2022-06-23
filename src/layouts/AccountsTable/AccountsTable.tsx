import React, { FC, useEffect } from 'react';
import { useQuery } from '@apollo/client/react';
import { Table } from 'components';

import { ACCOUNTS } from 'queries';
import { Accounts } from 'queries/__generated__/Accounts';
import { transformAccountData, columns } from './utils';
import { useErrorDisaply, useRouter } from 'utils/hooks';

const LayoutAccounts: FC = () => {
  const { skip } = useRouter();
  const { data, loading, error, refetch } = useQuery<Accounts>(ACCOUNTS, {
    variables: { skip },
  });
  useErrorDisaply(error);
  const accounts = data ? data?.accounts?.items?.map(transformAccountData) : null;

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      <Table dataSource={accounts} total={data?.accounts?.totalCount} loading={loading} columns={columns} />
    </div>
  );
};

export default LayoutAccounts;
