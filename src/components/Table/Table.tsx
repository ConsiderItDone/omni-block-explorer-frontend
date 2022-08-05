/** @jsxImportSource theme-ui */
import React, { FC, useCallback } from 'react';
import { Table as AntdTable, TableProps } from 'antd';
import { useRouter } from 'utils/hooks';
import queryString from 'query-string';
import { useStyles } from './styles';

//eslint-disable-next-line
interface Props extends TableProps<any> {
  total?: number;
  header?: JSX.Element;
}
const Table: FC<Props> = (props) => {
  const { search, pathname, navigate, queryObj } = useRouter();
  const styles = useStyles();

  const handlePageChange = useCallback(
    (page: number) => {
      queryObj.page = page.toString();
      navigate(`${pathname}?${queryString.stringify(queryObj)}`);
    },
    [search, queryObj],
  );

  return (
    <AntdTable
      sx={styles}
      {...props}
      onChange={(pagination) => handlePageChange(pagination.current)}
      title={() => <div className="table_title">{props.header}</div>}
      pagination={
        props?.pagination === false
          ? false
          : props.total && { total: props?.total || 10, current: Number(queryObj?.page) || 1 }
      }
    />
  );
};

export default Table;
