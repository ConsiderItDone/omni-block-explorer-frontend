//eslint-disable-next-line
export const transferDataTransformer = (dataRaw: any) => {
  const data = dataRaw.from ? dataRaw : typeof dataRaw === 'string' ? JSON.parse(dataRaw) : dataRaw[0];
  return {
    from: data?.from,
    to: data?.to,
    value: data?.value || data?.amount,
  };
};
