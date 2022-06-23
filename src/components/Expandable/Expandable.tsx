/** @jsxImportSource theme-ui */
import React, { FC, PropsWithChildren } from 'react';
import styles from './styles';

interface Props {
  expanded: boolean;
}
const Expandable: FC<PropsWithChildren<Props>> = ({ expanded, children }) => {
  return <div sx={styles} className={`${expanded ? 'active' : ''}`}>{children}</div>;
};

export default Expandable;
