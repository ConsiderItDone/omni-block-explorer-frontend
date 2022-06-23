import React, { FC, useEffect, useState, useCallback } from 'react';
import { useQuery } from '@apollo/client';

import { ROUTES } from 'utils/consts';
import { EVENTS } from 'queries';
import { Events } from 'queries/__generated__/Events';
import { Table, FilterForm } from 'components';

import { columns, transformEventData } from './utils';
import { useErrorDisaply, useRouter } from 'utils/hooks';
import { stringifyValues } from 'utils/funcs';
import moment from 'moment';

const constructFilterParamas = (queryObj) => {
  return {
    callModule: queryObj?.callModule || 'All',
    eventName: queryObj?.eventName || 'All',
    extrinsicHash: queryObj?.extrinsicHash,
    dateStart: queryObj?.dateStart ? moment(queryObj?.dateStart).startOf('day') : null,
    dateEnd: queryObj?.dateEnd ? moment(queryObj?.dateEnd).endOf('day') : null,
  };
};

const EventsTable: FC = () => {
  const { search, navigate, queryObj, skip } = useRouter();
  const [filterParams, setFilterParams] = useState(constructFilterParamas(queryObj));
  const { data, loading, error, refetch } = useQuery<Events>(EVENTS, {
    variables: {
      ...filterParams,
      skip,
      dateStart: filterParams.dateStart ? moment(filterParams.dateStart).startOf('day').toDate() : null,
      dateEnd: filterParams.dateEnd ? moment(filterParams.dateEnd).endOf('day').toDate() : null,
    },
  });
  useErrorDisaply(error);

  const events = data ? data?.events?.items?.map(transformEventData) : null;

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
    const res = stringifyValues(formValues);
    navigate(`${ROUTES.events}?${res}`);
  }, []);

  return (
    <div>
      <Table
        loading={loading}
        columns={columns}
        dataSource={events}
        total={data?.events?.totalCount}
        header={
          <>
            <FilterForm
              title="All Events"
              titleAddon={data?.events?.totalCount ? ` (${data?.events?.totalCount})` : ''}
              mode="event"
              initialValues={filterParams}
              onSubmit={handleSubmit}
            />
          </>
        }
      />
    </div>
  );
};

export default EventsTable;
