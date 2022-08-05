/** @jsxImportSource theme-ui */
import React, { FC } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { notification } from 'antd';
import styles from './styles';

const openNotificationWithIcon = (type: string, value: string) => {
  notification[type]({
    message: `Copied to clipboard: \r\n '${value}'`,
  });
};

const Copy: FC<{ text?: string; value: string }> = ({ text = 'Copy', value }): JSX.Element => {
  return (
    <CopyToClipboard text={value} onCopy={() => openNotificationWithIcon('success', value)}>
      <span sx={styles} className="btn-copy">
        {text}
      </span>
    </CopyToClipboard>
  );
};
export default Copy;
