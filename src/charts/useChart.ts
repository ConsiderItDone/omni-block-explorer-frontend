/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

import { am4themes_nodle } from './theme';
import React, { useLayoutEffect } from 'react';
import { createLegend, styleChart } from './utils';
import { generateExtrinsicChart } from './extrinsicsChart';
import { generateTransfersChart } from './transfersChart';

const chartOperations = {
  common: generateCommonChartProperies,
  extrinsics: generateExtrinsicChart,
  transfers: generateTransfersChart,
};
function generateCommonChartProperies(chart: am4charts.XYChart) {
  styleChart(chart);
  createLegend(chart);
}
export const useChart = (
  type: 'extrinsics' | 'transfers',
  ref: React.MutableRefObject<any>,
  chartData: any,
  containerId = 'chartdiv',
): void => {
  return useLayoutEffect(() => {
    const chart = am4core.create(containerId, am4charts.XYChart);

    am4core.useTheme((theme) => am4themes_nodle(theme, process.env.REACT_APP_PRIMARY_COLOR));

    chartOperations.common(chart);
    chartOperations[type](chart, chartData);

    ref.current = chart;

    return () => {
      ref.current.dispose();
    };
  }, [chartData]);
};
