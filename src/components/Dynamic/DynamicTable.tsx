/** @jsxImportSource theme-ui */
import React from 'react';
import { ColumnsType, ColumnType, TableProps } from 'antd/lib/table';
import Table from 'components/Table/Table';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'utils/hooks';

interface Props extends TableProps<any> {
  query?: any;
  columns: ColumnsType<any>;
}

function generateColumns<T = any>(columnData: ColumnType<any>[]): ColumnType<T>[] {
  console.log('data', columnData);
  return columnData.map((data, index) => ({
    key: index,
    dataIndex: data.dataIndex,
    title: data.title,
  }));
}

const DynamicTable: React.FC<Props> = (props) => {
  const { /* search, navigate, queryObj, */ skip } = useRouter();

  //const [dataSource, setDataSource] = useState([{ sender: 'mike', token: 'DOT', amount: '100' }]);

  const { data, loading /*,  error, refetch */ } = useQuery(gql(props.query), {
    variables: {
      skip,
    },
    errorPolicy: 'ignore',
  });

  const key = data && Object.keys(data)[0];

  function getNestedValue(obj: Record<string, any>, path: string) {
    const split = path.split('.');
    let res = obj;
    for (let i = 0; i < split.length; i++) {
      if (!res) return '';
      res = split[i] in res ? res[split[i]] : '';
    }
    return res;
  }

  function toDataSource(data: any[]) {
    const columns = generateColumns(props.columns);

    return data.map((data) => {
      const res = {};
      columns.forEach((c) => {
        const dataIndex = c.dataIndex;

        //@ts-ignore
        res[dataIndex] = dataIndex.includes('.') ? getNestedValue(data, dataIndex) : data[dataIndex];
      });

      console.log('res', res);
      return res;
    });
  }

  return (
    <Table
      {...props}
      loading={loading}
      dataSource={data ? toDataSource(data[key].items) : []}
      total={data ? data[key]?.totalCount : 0}
    />
  );
};

export default DynamicTable;
