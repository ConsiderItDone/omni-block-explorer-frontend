import React from 'react';
import { capitalize } from 'utils/funcs';
import { ColumnsType, ColumnType } from 'antd/lib/table';
import { Col, Row } from 'antd';

interface ColumnTypeWithDisable<T> extends ColumnType<T> {
  disabled?: boolean;
}
//eslint-disable-next-line
export const generateColumns = (obj: unknown, options?: { [key: string]: ColumnTypeWithDisable<any> }): ColumnsType => {
  const keys = Object.keys(obj);
  const res = keys.map((j) => !options[j]?.disabled && { dataIndex: j, key: j, title: capitalize(j), ...options[j] });
  return res.filter((res) => res.dataIndex);
};

//eslint-disable-next-line
export const dataToJSX = (data: any): JSX.Element | JSX.Element[] => {
  if (typeof data === typeof [] && data[0])
    if (typeof data[0] === 'object') {
      const keys = Object.keys(data[0]);
      return keys.map((key) => (
        <Row key={key} style={{ borderBottom: '1px solid gray', padding: 5 }}>
          <Col span={2}>{key}</Col>
          <Col span={6}>{data[0][key]}</Col>
        </Row>
      ));
    }
  if (typeof data === typeof [] && typeof data[0] === 'string') {
    return data.map((i, index) => (
      <Row key={index} style={{ borderBottom: '1px solid gray', padding: 5 }}>
        <Col span={2} />
        <Col span={6}>{JSON.stringify(i)}</Col>
      </Row>
    ));
  } else
    return (
      <Row style={{ borderBottom: '1px solid gray', padding: 5 }}>
        <Col span={2} />
        <Col span={6}>{JSON.stringify(data)}</Col>
      </Row>
    );
};
