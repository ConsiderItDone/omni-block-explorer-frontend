/** @jsxImportSource theme-ui */
import React, { FC, useEffect, useState, useRef} from 'react';
import { useRouter } from 'utils/hooks';
import { Table } from 'components';
import { Input, Button } from 'antd';
import { columns, transformLogData,filterformLogData } from './utils';
import { useStyles } from './styles';

const Search = Input.Search;
const LOGS_PAGE_SIZE = 10;
const query = `query Logs($offset: Int!, $first: Int!) {
    allLogs(offset: $offset, first: $first) { 
      nodes {
        timestamp,
        logId,
        level,
        description
      },
      totalCount
    }
  }`
;

const LogsTable: FC = () => {
  const styles = useStyles();
  const { skip } = useRouter();

  const [filter, setFilter] = useState({
    error: true,
    warn: true,
    info: true,
    debug: true,
    searchString: '',
  });
  const searchingString = useRef('');

  const changeFilterHandler = filterName => {
    let defaultFilter = {
      error: true,
      warn: true,
      info: true,
      debug: true,
    };
    switch(filterName) {
      case 'error': 
        defaultFilter = {
          error: true,
          warn: false,
          info: false,
          debug: false,
        };
        break;
      case 'warn': 
        defaultFilter = {
          error: true,
          warn: true,
          info: false,
          debug: false,
        };
        break;
      case 'info': 
        defaultFilter = {
          error: true,
          warn: true,
          info: true,
          debug: false,
        };
        break;
      case 'debug': 
        defaultFilter = {
          error: true,
          warn: true,
          info: true,
          debug: true,
        };
        break;
      default:
        break;
    }
    setFilter(prev => {
      return {
        ...defaultFilter,
        searchString: prev.searchString,
      };
    });
  };

  const searchInputHandler = () => {
    setFilter(prev => {
      return {
        ...prev,
        searchString: searchingString.current,
      };
    });
  };
  const [data, setData] = useState({allLogs:{totalCount: 0, nodes:[]}});

  useEffect(() => {
    const variables = { "offset": skip, "first": LOGS_PAGE_SIZE};
    const operationName = "Logs";
    const fetcher = async () => {
      const data = await fetch(process.env.REACT_APP_GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({query, operationName, variables}),
        credentials: 'same-origin',
      });
      const jsonResult = await data.json().catch(() => data.text());
      setData(jsonResult.data);
    };
    fetcher();
  }, [skip]);

  const filtredLogs = data ? data?.allLogs?.nodes?.filter(filterformLogData(filter)).map(transformLogData) : null;

  return (
    <div className="blocks" sx={styles}>
      <div className="filterHeader">
        <div>Filter by:</div>
        <Button type="text" data-filter={filter.error} onClick={()=>changeFilterHandler('error')}>error</Button>
        <Button type="text" data-filter={filter.warn} onClick={()=>changeFilterHandler('warn')}>warn</Button>
        <Button type="text" data-filter={filter.info} onClick={()=>changeFilterHandler('info')}>info</Button>
        <Button type="text" data-filter={filter.debug} onClick={()=>changeFilterHandler('debug')}>debug</Button>
        <Search
          placeholder="Search by Log"
          style={{ width: 200 }}
          onSearch={searchInputHandler}
          onChange={(e) => searchingString.current = e.target.value}
        />
      </div>
      <Table dataSource={filtredLogs} total={data?.allLogs?.totalCount} loading={false} columns={columns} showHeader={false} className="table" tableLayout={'fixed'} />
    </div>
  );
};

export default LogsTable;
