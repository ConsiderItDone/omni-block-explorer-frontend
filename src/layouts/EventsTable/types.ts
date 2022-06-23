export interface TransformedEventData {
  key: string;
  id: string;
  block: string;
  extrinsicHash: string;
  time: any; //eslint-disable-line
  action: string;
  extrinsicIndex: string | number;
  data: any; //eslint-disable-line
}
