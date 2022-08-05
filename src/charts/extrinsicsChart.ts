import * as am4charts from '@amcharts/amcharts4/charts';
import { RESPONSIVE_BREAKPOINTS } from 'utils/consts';

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

export const generateExtrinsicChart = (chart: am4charts.XYChart, chartData: any, themeUI): void => {
  createTitle(chart, 'Extrinsic History', themeUI);
  attachData(chart, chartData?.extrinsicsChartData);

  const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  dateAxis.tooltip.disabled = true;
  dateAxis.marginTop = 20;
  styleAxis(dateAxis);
  dateAxis.groupData = window.innerWidth <= RESPONSIVE_BREAKPOINTS.md ? true : false;
  dateAxis.groupCount = 100;

  const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  styleAxis(valueAxis);
  valueAxis.renderer.opposite = window.innerWidth <= RESPONSIVE_BREAKPOINTS.md ? true : false;

  const series = createSeries(chart, themeUI, { name: 'Quantity' });
  attachDataFieds(series, { dateX: 'date', valueY: 'quantity' });
  addTooltip(series);

  createCursor(chart, { xAxis: dateAxis });
  createLegend(chart, themeUI);
};
