export interface TransformedBlockItem {
  key: string;
  number: string;
  timestamp: any; //eslint-disable-line
  hash: string;
  finalized: boolean;
  extrinsics: number;
  events: number;
}
