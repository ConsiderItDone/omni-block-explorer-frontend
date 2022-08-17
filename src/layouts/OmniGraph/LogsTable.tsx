/** @jsxImportSource theme-ui */
import React, { FC, useEffect, useState, useRef, useCallback } from 'react';
import { useRouter } from 'utils/hooks';
import { Table } from 'components';
import { Input, Button } from 'antd';
import { columns, transformLogData } from './utils';
import { useStyles } from './styles';
import queryString from 'query-string';

const Search = Input.Search;
const LOGS_PAGE_SIZE = 10;
const query = `query Logs($filterLevel: String, $searchString:String, $offset: Int, $first: Int){
  fetchLogs(filterLevel: $filterLevel, searchString:$searchString, offset: $offset, first: $first) {
    logs{
      logId
      level
      description
      timestamp
    }
    totalCount
  }
}`;

const LogsTable: FC = () => {
  const styles = useStyles();
  const { skip, pathname, navigate, queryObj } = useRouter();
  const [filter, setFilter] = useState({
    error: true,
    warn: true,
    info: true,
    debug: true,
  });
  const [data, setData] = useState({ totalCount: 0, logs: [] });

  const changeFilterHandler = (filterName) => {
    let filterLevel = {
      error: true,
      warn: true,
      info: true,
      debug: true,
    };
    switch (filterName) {
      case 'error':
        filterLevel = {
          error: true,
          warn: false,
          info: false,
          debug: false,
        };
        break;
      case 'warn':
        filterLevel = {
          error: true,
          warn: true,
          info: false,
          debug: false,
        };
        break;
      case 'info':
        filterLevel = {
          error: true,
          warn: true,
          info: true,
          debug: false,
        };
        break;
      case 'debug':
        filterLevel = {
          error: true,
          warn: true,
          info: true,
          debug: true,
        };
        break;
      default:
        break;
    }
    setFilter(filterLevel);
    queryObj.logLevel = filterName;
    navigate(`${pathname}?${queryString.stringify(queryObj)}`);
  };

  const fetchLogs = useCallback(async (offset, filterLevel, searchString, first) => {
    const variables = {
      offset: offset,
      filterLevel: filterLevel,
      searchString: searchString,
      first: first,
    };
    const operationName = 'Logs';
    const data = await fetch(`${process.env.REACT_APP_GRAPHQL_ENDPOINT}/logs`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, operationName, variables }),
      credentials: 'same-origin',
    });
    const jsonResult = await data.json().catch(() => data.text());
    setData(jsonResult?.data?.fetchLogs);
  }, []);

  useEffect(() => {
    fetchLogs(skip, queryObj.logLevel, queryObj.search, LOGS_PAGE_SIZE);
  }, [skip, queryObj.logLevel, queryObj.search]);

  const filtredLogs = data ? data?.logs?.map(transformLogData) : null;

  return (
    <div className="blocks" sx={styles}>
      <div className="filterHeader">
        <div>Filter by:</div>
        <Button
          type="text"
          data-filter={filter.error}
          data-filter-level={'error'}
          onClick={() => changeFilterHandler('error')}
        >
          error
        </Button>
        <Button
          type="text"
          data-filter={filter.warn}
          data-filter-level={'warn'}
          onClick={() => changeFilterHandler('warn')}
        >
          warn
        </Button>
        <Button
          type="text"
          data-filter={filter.info}
          data-filter-level={'info'}
          onClick={() => changeFilterHandler('info')}
        >
          info
        </Button>
        <Button
          type="text"
          data-filter={filter.debug}
          data-filter-level={'debug'}
          onClick={() => changeFilterHandler('debug')}
        >
          debug
        </Button>
        <Search
          placeholder="Search by Log"
          style={{ width: 200 }}
          onSearch={(value) => {
            queryObj.page = 1;
            queryObj.search = value;
            navigate(`${pathname}?${queryString.stringify(queryObj)}`);
          }}
        />
      </div>
      <Table
        dataSource={filtredLogs}
        total={data?.totalCount}
        loading={false}
        columns={columns}
        showHeader={false}
        className="table"
        tableLayout={'fixed'}
      />
    </div>
  );
};

export default LogsTable;
