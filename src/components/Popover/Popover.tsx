/** @jsxImportSource theme-ui */
import React from 'react';
import { Popover } from 'antd';

import { TooltipPlacement } from 'antd/lib/tooltip';
import style from './styles';

interface PopoverProps {
  title: string;
  content: React.ReactNode;
  placement?: TooltipPlacement;
}

export default ({ title, content, placement }: PopoverProps): JSX.Element => {
  return (
    <Popover content={content} overlayClassName="popover-overlay" placement={placement}>
      <button sx={style.btn} className="btn-popover">
        {title}
      </button>
    </Popover>
  );
};
