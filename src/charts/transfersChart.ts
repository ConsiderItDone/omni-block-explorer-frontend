import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

import {
  createTitle,
  attachData,
  createSeries,
  addTooltip,
  attachDataFieds,
  createCursor,
  createLegend,
  styleAxis,
} from './utils';
import { RESPONSIVE_BREAKPOINTS } from 'utils/consts';

export const generateTransfersChart = (chart: am4charts.XYChart, chartData: any, themeUI): void => {
  createTitle(chart, 'Transfer History', themeUI);
  chart.rightAxesContainer.layout = 'vertical';
  attachData(
    chart,
    chartData?.transfersChartData.map((i) => ({ ...i, amount: i.amount || 1 })),
  );

  const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  dateAxis.tooltip.disabled = true;
  styleAxis(dateAxis);
  dateAxis.groupData = window.innerWidth <= RESPONSIVE_BREAKPOINTS.md ? true : false;
  dateAxis.groupCount = 30;

  const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.marginBottom = window.innerWidth <= RESPONSIVE_BREAKPOINTS.md ? 0 : 50;
  valueAxis.logarithmic = true;
  styleAxis(valueAxis);
  valueAxis.numberFormatter = new am4core.NumberFormatter();
  valueAxis.numberFormatter.numberFormat = '#a';
  valueAxis.renderer.opposite = window.innerWidth <= RESPONSIVE_BREAKPOINTS.md ? true : false;

  const series = createSeries(chart, { name: 'Sum' });
  attachDataFieds(series, { dateX: 'date', valueY: 'amount', valueX: 'quantity' });
  addTooltip(series, true);

  const valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
  //valueAxis2.logarithmic = true;
  styleAxis(valueAxis2);
  valueAxis2.renderer.opposite = window.innerWidth <= RESPONSIVE_BREAKPOINTS.md ? true : false;
  const series2 = createSeries(chart, {
    yAxis: valueAxis2,
    name: 'Number of Transactions',
    fill: am4core.color('#878D94'),
    stroke: am4core.color('#878D94'),
  });
  series2.tooltip.disabled = true;

  attachDataFieds(series2, { dateX: 'date', valueY: 'quantity' });

  createLegend(chart);
  createCursor(chart, { xAxis: dateAxis });
};
