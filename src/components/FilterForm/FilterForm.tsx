/** @jsxImportSource theme-ui */
import React, { FC, useCallback, useMemo, useState } from 'react';
import { Select, Input, Space, Button, Form, DatePicker, Badge } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useQuery } from '@apollo/client';

import { ExtrinsicFilterOptions } from 'queries/__generated__/ExtrinsicFilterOptions';
import { EVENT_FILTER_OPTIONS, EXTRINSIC_FILTER_OPTIONS } from 'queries';
import { EventFilterOptions } from 'queries/__generated__/EventFilterOptions';
import { Expandable } from 'components';
import moment from 'moment';
import { useRouter } from 'utils/hooks';
import { RESPONSIVE_BREAKPOINTS } from 'utils/consts';

import { useStyles } from './styles';
import { useThemeUI } from 'theme-ui';

//eslint-disable-next-line
const close = require('images/close.png');

interface ModuleInterface {
  name: string;
  types: string[];
}

const { Option } = Select;
const { Item } = Form;

//eslint-disable-next-line
const moduleSelect = (modules: ModuleInterface[], onChange: (value: any) => void) => (
  <Item name="callModule">
    <Select onSelect={onChange} className="label-module">
      <Option key="all" value="All">
        All
      </Option>
      {modules?.map((module) => (
        <Option key={module.name} value={module.name}>
          {module.name}
        </Option>
      ))}
    </Select>
  </Item>
);

const expandButton = (cb) => (
  <Item>
    <Button onClick={cb}>More</Button>
  </Item>
);

const ExpandItems = {
  event: (onCancel = () => undefined) => {
    return (
      <>
        <Item name="dateStart">
          <DatePicker placeholder="Start Date" disabledDate={(current) => current && current > moment().endOf('day')} />
        </Item>
        <Item name="dateEnd">
          <DatePicker placeholder="End Date" disabledDate={(current) => current && current > moment().endOf('day')} />
        </Item>
        <Item name="extrinsicHash" className="fullWidth">
          <Input placeholder="Extrinsic Hash" />
        </Item>
        <Item>
          <Button htmlType="submit">Apply</Button>
        </Item>
        {window?.innerWidth < RESPONSIVE_BREAKPOINTS.sm && (
          <Item>
            <Button onClick={onCancel}>Cancel</Button>
          </Item>
        )}
      </>
    );
  },
  extrinsic: (onCancel = () => undefined) => {
    return (
      <>
        <Item name="dateStart">
          <DatePicker placeholder="Start Date" disabledDate={(current) => current && current > moment().endOf('day')} />
        </Item>
        <Item name="dateEnd">
          <DatePicker placeholder="End Date" disabledDate={(current) => current && current > moment().endOf('day')} />
        </Item>
        <Item name="signer" className="fullWidth">
          <Input placeholder="Signer" />
        </Item>
        <Item>
          <Button htmlType="submit">Apply</Button>
        </Item>
        {window?.innerWidth < RESPONSIVE_BREAKPOINTS.sm && (
          <Item>
            <Button onClick={onCancel}>Cancel</Button>
          </Item>
        )}
      </>
    );
  },
};
const FormItems = {
  event: () => {
    const [module, setModule] = useState<ModuleInterface>({ name: 'All', types: ['All'] });
    const { data } = useQuery<EventFilterOptions>(EVENT_FILTER_OPTIONS);
    const filterOptions = useMemo(
      () =>
        data
          ? data.modules.items
              .map((i) => ({ name: i.name, types: i.eventTypes.map((e) => e.name) }))
              .sort((a, b) => (a.name < b.name ? -1 : 1))
          : null,
      [data],
    );
    const onModuleSelect = (moduleName: string) => {
      const selectedModule = filterOptions?.find((f) => f.name === moduleName);
      setModule(selectedModule);
    };
    return (
      <>
        {moduleSelect(filterOptions, onModuleSelect)}
        <Item
          name="eventName"
          //TODO check render update
          shouldUpdate={(prev, cur) => {
            return prev.eventName !== cur.eventName;
          }}
        >
          <Select className="label-event">
            <Option key="all" value="All">
              All
            </Option>
            {module?.types
              ?.sort((a, b) => (a < b ? -1 : 1))
              ?.map((event) => (
                <Option key={event} value={event}>
                  {event}
                </Option>
              ))}
          </Select>
        </Item>
      </>
    );
  },
  extrinsic: () => {
    const [module, setModule] = useState<ModuleInterface>({ name: 'All', types: ['All'] });

    const { data } = useQuery<ExtrinsicFilterOptions>(EXTRINSIC_FILTER_OPTIONS);
    const filterOptions = useMemo(
      () =>
        data
          ? data.modules.items
              .map((i) => ({ name: i.name, types: i?.extrinsicTypes?.map((e) => e?.name) }))
              .sort((a, b) => (a.name < b.name ? -1 : 1))
          : null,
      [data],
    );

    const onModuleSelect = (moduleName: string) => {
      const selectedModule = filterOptions?.find((f) => f.name === moduleName);
      setModule(selectedModule);
    };
    return (
      <>
        {moduleSelect(filterOptions, onModuleSelect)}
        <Item name="callFunction">
          <Select className="label-call">
            <Option key="all" value="All">
              All
            </Option>
            {module?.types
              ?.sort((a, b) => (a < b ? -1 : 1))
              ?.map((extr) => (
                <Option key={extr} value={extr}>
                  {extr}
                </Option>
              ))}
          </Select>
        </Item>
        <Item name="signedOnly">
          <Select className="label-sign">
            <Option value={'1'}>Signed only</Option>
            <Option value={'0'}>All</Option>
          </Select>
        </Item>
      </>
    );
  },
};

interface FilterFormProps {
  title?: string;
  titleAddon?: string | number;
  mode: 'extrinsic' | 'event';
  initialValues:
    | { callModule: string; callFunction: string; signedOnly: boolean | number }
    | { callModule: string; eventName: string };
  onSubmit: (values: any) => void; //eslint-disable-line
  onExpand?: () => void;
}

const FilterForm: FC<FilterFormProps> = ({ title, titleAddon, mode, initialValues, onSubmit }) => {
  const { queryObj } = useRouter();
  const [form] = useForm();
  const [expanded, setExpanded] = useState(
    queryObj.dateStart || queryObj.dateEnd || queryObj.signer || queryObj.extrinsicHash,
  );
  const [mobileActive, setMobileActive] = useState<boolean>(false);
  const { theme: themeUI } = useThemeUI();
  const styles = useStyles();

  const onExpand = () => setExpanded((prev) => !prev);

  const handleSubmit = (values: { [key: string]: string }) => {
    mobileActive && setMobileActive(false);
    onSubmit(values);
  };

  const handleSubmitOnChange = useCallback(
    (changedValue, allValues) => {
      const keyChanged = Object.keys(changedValue)[0];
      if (
        ['callModule', 'callFunction', 'signedOnly', 'eventName'].some((val) => val === keyChanged) &&
        !expanded &&
        window.innerWidth > RESPONSIVE_BREAKPOINTS.sm
      ) {
        handleSubmit(allValues);
      }
    },
    [expanded, handleSubmit],
  );

  const formProps = useMemo(
    () => ({ form: form, onValuesChange: handleSubmitOnChange, onFinish: handleSubmit, initialValues: initialValues }),
    [form, handleSubmitOnChange, onSubmit, initialValues],
  );
  const badgeCount = () => {
    const values = form.getFieldsValue();
    const keys = Object.keys(values);
    return keys.filter((k) => values[k] && k).filter((k) => values[k] !== 'All' && values[k] != 0).length;
  };

  return (
    <div sx={styles.filterForm} className="filterForm">
      {window.innerWidth <= RESPONSIVE_BREAKPOINTS.sm ? (
        <>
          <div className="base">
            {title && (
              <h2>
                {title}
                {titleAddon && <span className="addon">{titleAddon}</span>}
              </h2>
            )}
            <Button onClick={() => setMobileActive(true)}>
              Filter
              {badgeCount() != 0 && <Badge count={badgeCount()} />}
            </Button>
            <div sx={styles.filterMobile} className={`${mobileActive ? ' active' : ''}`}>
              <Button className="closeBtn" onClick={() => setMobileActive(false)}>
                <img src={close} />
              </Button>
              <Form {...formProps}>
                {FormItems[mode]()}
                {ExpandItems[mode](() => setMobileActive(false))}
              </Form>
            </div>
          </div>
        </>
      ) : (
        <Form {...formProps}>
          <div className="base">
            {title && (
              <h2 style={{ color: String(themeUI.rawColors.text) }}>
                {title}
                {titleAddon && <span className="addon">{titleAddon}</span>}
              </h2>
            )}
            <Input.Group>
              <Space size="middle" wrap>
                {FormItems[mode]()}
                {onExpand && expandButton(onExpand)}
              </Space>
            </Input.Group>
          </div>
          <Expandable expanded={expanded}>
            <div className="row">{ExpandItems[mode]()}</div>
          </Expandable>
        </Form>
      )}
    </div>
  );
};

export default FilterForm;
