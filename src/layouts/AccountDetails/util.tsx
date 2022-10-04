import { generateColumns } from 'utils/generators';
import { AccountRenderProps, accountTableItemObj } from '../AccountsTable/utils';

export interface FullAccountRenderProps extends AccountRenderProps {
  nonce: number;
  refcount: number;
  role: string;
}
const accountItemFullInfo: FullAccountRenderProps = { ...accountTableItemObj, nonce: 0, refcount: 0, role: '' };

export const columns = generateColumns(accountItemFullInfo, {
  address: { disabled: true },
  free: { title: 'Balance' },
});
