/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

import { am4themes_nodle } from './theme';
import React, { useLayoutEffect } from 'react';
import { createLegend, styleChart } from './utils';
import { generateExtrinsicChart } from './extrinsicsChart';
import { generateTransfersChart } from './transfersChart';
import { Theme } from 'theme-ui';

const chartOperations = {
  common: generateCommonChartProperies,
  extrinsics: generateExtrinsicChart,
  transfers: generateTransfersChart,
};
function generateCommonChartProperies(chart: am4charts.XYChart, themeUI?) {
  styleChart(chart);
  createLegend(chart, themeUI);
}
export const useChart = (
  type: 'extrinsics' | 'transfers',
  ref: React.MutableRefObject<any>,
  chartData: any,
  themeUI: Theme,
  containerId = 'chartdiv',
): void => {
  return useLayoutEffect(() => {
    const chart = am4core.create(containerId, am4charts.XYChart);

    am4core.useTheme((theme) => am4themes_nodle(theme, themeUI));

    chartOperations.common(chart, themeUI);
    chartOperations[type](chart, chartData, themeUI);

    ref.current = chart;

    return () => {
      ref.current.dispose();
    };
  }, [chartData, ref.current]);
};
