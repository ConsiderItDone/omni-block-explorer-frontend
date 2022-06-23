import React, { FC, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { ROOT_CERTIFICATES } from 'queries';
import { Table } from 'components';

import { columns, transformCertificate } from './utils';
import { RootCertificates } from 'queries/__generated__/RootCertificates';
import { useErrorDisaply, useRouter } from 'utils/hooks';

const CertificatesTable: FC = () => {
  const { skip } = useRouter();
  const { data, loading, error, refetch } = useQuery<RootCertificates>(ROOT_CERTIFICATES, {
    variables: { skip },
  });
  useErrorDisaply(error);
  const certificates = data ? data?.rootCertificates.items.map(transformCertificate) : null;

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      <Table
        loading={loading}
        columns={columns}
        dataSource={certificates}
        header={
          <>
            <h3>
              Root Certificates
              {data?.rootCertificates?.totalCount ? (
                <span className="addon"> ({data?.rootCertificates?.totalCount})</span>
              ) : (
                ''
              )}
            </h3>
          </>
        }
      />
    </div>
  );
};

export default CertificatesTable;
