/** @jsxImportSource theme-ui */
import React from 'react';
import { Spin } from 'antd';

export default function AppLoader({ width = '100%', height = '100%' }) {
  return (
    <div sx={{ display: 'flex', alignItems: 'center', width, height }}>
      <Spin size="large" />
    </div>
  );
}
