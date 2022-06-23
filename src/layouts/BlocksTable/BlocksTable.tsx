import React, { FC, useEffect } from 'react';
import { useQuery } from '@apollo/client/react';

import { BLOCKS } from 'queries';
import { Blocks } from 'queries/__generated__/Blocks';
import { Table } from 'components';

import { transformBlockItem, columns } from './utils';
import { useErrorDisaply, useRouter } from 'utils/hooks';

const LayoutBlocks: FC = () => {
  const { skip } = useRouter();
  const { data, loading, error, refetch } = useQuery<Blocks>(BLOCKS, {
    variables: { skip },
  });
  useErrorDisaply(error);
  const blocks = data ? data.blocks.items.map(transformBlockItem) : null;

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="blocks">
      <Table
        loading={loading}
        columns={columns}
        dataSource={blocks}
        total={data?.blocks?.totalCount}
        header={
          <h3>
            Blocks
            {data?.blocks?.totalCount && <span className="addon"> ({data?.blocks?.totalCount})</span>}
          </h3>
        }
      />
    </div>
  );
};

export default LayoutBlocks;
