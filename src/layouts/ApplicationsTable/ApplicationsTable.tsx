import React, { FC, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { APPLICATIONS } from 'queries';
import { Table } from 'components';
import { columns, transformApplicationData } from './utils';
import { Applications } from 'queries/__generated__/Applications';
import { useErrorDisaply, useRouter } from 'utils/hooks';

const ApplicationsTable: FC = () => {
  const { skip } = useRouter();

  const { data, loading, error, refetch } = useQuery<Applications>(APPLICATIONS, {
    variables: { skip },
  });
  useErrorDisaply(error);

  const applications = data ? data.applications.items.map(transformApplicationData) : null;

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      <Table
        loading={loading}
        columns={columns}
        dataSource={applications}
        total={data?.applications?.totalCount}
        header={
          <>
            <h3>
              Applications
              {data?.applications?.totalCount ? <span className="addon"> ({data?.applications?.totalCount})</span> : ''}
            </h3>
            {/* <FilterForm mode="extrinsic" initialValues={filterParams} onSubmit={handleSubmit} /> */}
          </>
        }
      />
    </div>
  );
};

export default ApplicationsTable;
