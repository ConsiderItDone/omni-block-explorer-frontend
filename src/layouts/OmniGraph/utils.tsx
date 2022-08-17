import React, { FC } from 'react';
import { generateColumns } from 'utils/generators';

const StatusElement: FC<{ statusLevel: string }> = ({ statusLevel = 1 }) => {
  return (
    <div data-status-level={statusLevel} className="logStatusLevel">
      {statusLevel}
    </div>
  );
};

export interface FilterLogs {
  error: boolean;
  warn: boolean;
  info: boolean;
  debug: boolean;
  searchString: string;
}
export interface LogsRenderProps {
  key?: string; // antd table row key
  timestamp: string;
  level: string;
  description: string;
}
const logTableItemObj: LogsRenderProps = {
  timestamp: '',
  level: '',
  description: '',
};
const logTableItemObjHome = {
  date: null,
};
export const columns = generateColumns(logTableItemObj, {
  timestamp: { title: 'date', width: 200, responsive: ['md'], render: (value) => <p className="logDate">{value}</p> },
  level: { title: 'level', width: 100, responsive: ['md'], render: (value) => <StatusElement statusLevel={value} /> },
  description: { title: 'description', responsive: ['md'] },
});

export const columnsMini = generateColumns(logTableItemObjHome, {
  address: { title: 'Logs', ellipsis: true },
});

export const transformLogData = (validator: any): LogsRenderProps => {
  const { logId, timestamp, level, description } = validator;
  return {
    key: logId,
    timestamp: new Date(timestamp).toLocaleString(),
    level,
    description,
  };
};
