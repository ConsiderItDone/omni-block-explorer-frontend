import React from 'react';
import { ColumnType } from 'antd/lib/table';
import DynamicTable from './DynamicTable';

interface ComponentProps {
  type: 'table';
  columns?: ColumnType<any>[];
  query?: string;
  [key: string]: any;
}

export function mapPropToComponent(componentProps: ComponentProps): JSX.Element {
  switch (componentProps.type) {
    case 'table': {
      return <DynamicTable columns={componentProps?.columns} query={componentProps.query} />;
    }
    default:
      return undefined;
  }
}

export default function DynamicComponent(props: ComponentProps) {
  return mapPropToComponent(props);
}
