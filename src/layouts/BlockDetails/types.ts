export interface TransformedEventData {
  key: string;
  id: string;
  hash: string;
  action: string;
  moduleName: string;
  eventName: string;
  data: any; //eslint-disable-line
}

export interface TransformedLogData {
  key: string;
  id: string;
  block: number;
  type: string;
}
