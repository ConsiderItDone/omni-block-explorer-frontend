export interface Balance {
  free: number | string;
  feeFrozen: number | string;
  miscFrozen: number | string;
  reserved: number | string;
}
export const balanceTableItemObj = {
  free: 0,
  feeFrozen: 0,
  miscFrozen: 0,
  reserved: 0,
};
