/** @jsxImportSource theme-ui */
import React, { FC } from 'react';
//@ts-ignore
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import styles from './styles';

const openNotificationWithIcon = (type: string, value: string) => {
  toast.success(`Copied to clipboard: \r\n '${value}'`, { progress: 0 });
};

const Copy: FC<{ text?: string; value: string }> = ({ text = 'Copy', value }): JSX.Element => {
  return (
    <>
      <CopyToClipboard text={value} onCopy={() => openNotificationWithIcon('success', value)}>
        <span sx={styles} className="btn-copy">
          {text}
        </span>
      </CopyToClipboard>
    </>
  );
};
export default Copy;
