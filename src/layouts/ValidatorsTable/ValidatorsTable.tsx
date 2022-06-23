import React, { FC, useEffect } from 'react';
import { useQuery } from '@apollo/client/react';
import { VALIDATORS } from 'queries';
import { Table } from 'components';

import { Validators } from 'queries/__generated__/Validators';
import { columns, transformValidatorData } from './utils';
import { useErrorDisaply } from 'utils/hooks';

const ValidatorsTable: FC = () => {
  const { data, loading, error, refetch } = useQuery<Validators>(VALIDATORS);

  useErrorDisaply(error);
  const validators = data ? data?.validators?.items?.map(transformValidatorData) : null;

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="blocks">
      <Table dataSource={validators} loading={loading} columns={columns} className="table" tableLayout={'fixed'} />
    </div>
  );
};

export default ValidatorsTable;
