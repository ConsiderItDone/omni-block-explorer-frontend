/* eslint-disable */
import React, { FC, useEffect, useState, useCallback, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { CHART_EXTRINSICS, EXTRINSICS } from 'queries';
import { Extrinsics } from 'queries/__generated__/Extrinsics';
import { Table, FilterForm } from 'components';
import { ROUTES } from 'utils/consts';
import { columns, transformExtrinsicData } from './utils';
import { ChartExtrinsics } from 'queries/__generated__/ChartExtrinsics';
import { useErrorDisaply, useRouter } from 'utils/hooks';
import { stringifyValues } from 'utils/funcs';
import moment from 'moment';
import { useChart } from 'charts/useChart';
import { useThemeUI } from 'theme-ui';

const constructFilterParamas = (queryObj) => {
  return {
    callModule: queryObj?.callModule || 'All',
    callFunction: queryObj?.callFunction || 'All',
    signedOnly: queryObj?.signedOnly || '0',
    signer: queryObj?.signer,
    dateStart: queryObj?.dateStart ? moment(queryObj?.dateStart) : '',
    dateEnd: queryObj?.dateEnd ? moment(queryObj?.dateEnd) : '',
  };
};
const ExtrinsicsTable: FC = () => {
  const { search, navigate, queryObj, skip } = useRouter();
  const { theme: themeUI } = useThemeUI();

  const [filterParams, setFilterParams] = useState(constructFilterParamas(queryObj));

  const { data, loading, error, refetch } = useQuery<Extrinsics>(EXTRINSICS, {
    variables: {
      ...filterParams,
      signedOnly: filterParams.signedOnly == 1,
      skip,
      dateStart: queryObj?.dateStart ? moment(queryObj?.dateStart).startOf('day') : null,
      dateEnd: queryObj?.dateEnd ? moment(queryObj?.dateEnd).endOf('day') : null,
    },
  });
  useErrorDisaply(error);
  const { data: chartData } = useQuery<ChartExtrinsics>(CHART_EXTRINSICS);

  const extrinsics = data ? data?.extrinsics?.items?.map(transformExtrinsicData) : null;

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    setFilterParams(constructFilterParamas(queryObj));
  }, [search]);

  //eslint-disable-next-line
  const handleSubmit = useCallback((formValues: any) => {
    if (formValues.dateStart) {
      formValues.dateStart = moment(formValues.dateStart).format('YYYY-MM-DD');
    }
    if (formValues.dateEnd) {
      formValues.dateEnd = moment(formValues.dateEnd).format('YYYY-MM-DD');
    }
    navigate(`${ROUTES.extrinsics}?${stringifyValues(formValues)}`);
  }, []);

  const x: any = useRef(null);

  useChart('extrinsics', x, chartData, themeUI);
  return (
    <div>
      <div
        id="chartdiv"
        style={{ width: '100%', height: '300px', borderRadius: 24, overflow: 'hidden', marginBottom: 32 }}
      ></div>
      <Table
        loading={loading}
        columns={columns}
        dataSource={extrinsics}
        total={data?.extrinsics?.totalCount}
        header={
          <>
            <FilterForm
              title="All Extrinsics"
              titleAddon={data?.extrinsics?.totalCount ? ` (${data?.extrinsics?.totalCount})` : ''}
              mode="extrinsic"
              initialValues={filterParams}
              onSubmit={handleSubmit}
            />
          </>
        }
      />
    </div>
  );
};

export default ExtrinsicsTable;
