/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import { RESPONSIVE_BREAKPOINTS } from 'utils/consts';
import { Theme } from 'theme-ui';

export const attachDataFieds = (series: am4charts.ColumnSeries, dataFields: am4charts.IColumnSeriesDataFields) => {
  Object.keys(dataFields).forEach((key) => (series.dataFields[key] = dataFields[key]));
};

export const addTooltip = (series: am4charts.ColumnSeries, additional = false, colorMode = 'dark', theme?: Theme) => {
  const valueColor = colorMode === 'light' ? 'black' : 'white';

  series.tooltipHTML = `<div style="display: flex; flex-direction: column; padding: 10px 12px 0">
      <div style="margin-bottom: 12px"> 
        <div style="color: #878D94; font-size: 12px; line-height: 18px;">Date</div>
        <div style="color: ${valueColor}; font-size: 16px; font-weight: 500; line-height: 24px;">{dateX}</div>
      </div>
      <div style="margin-bottom: 12px">
        <div style="color: #878D94; font-size: 12px; line-height: 18px;">{name}</div>
        <div style="color: ${valueColor}; font-size: 16px; font-weight: 500; line-height: 24px;">{valueY}</div>
      </div>
      ${
        additional
          ? `<div style="margin-bottom: 12px">
        <div style="color: #878D94; font-size: 12px; line-height: 18px;">Number of Transactions</div>
        <div style="color: ${valueColor}; font-size: 16px; font-weight: 500; line-height: 24px;">{valueX}</div>
      </div>`
          : ''
      }
    </div>`;

  series.tooltip.getFillFromObject = false;
  //@ts-ignore
  series.tooltip.background.fill = am4core.color(theme?.rawColors['window-dark'] || '#24303d');
  series.tooltip.background.opacity = 1;
  series.tooltip.background.cornerRadius = 24;
  series.tooltip.background.strokeOpacity = 0;
  series.tooltip.pointerOrientation = 'down';
};

export const styleAxis = (axis: am4charts.Axis) => {
  axis.strokeWidth = 0;
  axis.renderer.labels.template.fill = am4core.color('#878D94');
  //@ts-ignore
  if (axis._className === 'ValueAxis') {
    axis.renderer.labels.template.align = window.innerWidth <= RESPONSIVE_BREAKPOINTS.md ? 'right' : 'left';
  }
};

export const createTitle = (chart: am4charts.Chart, title, themeUI) => {
  const topContainer = chart.createChild(am4core.Container);
  topContainer.layout = 'absolute';
  topContainer.toBack();
  topContainer.paddingBottom = 15;
  topContainer.width = am4core.percent(100);

  const axisTitle = topContainer.createChild(am4core.Label);
  axisTitle.text = title;
  axisTitle.fontSize = window.innerWidth <= RESPONSIVE_BREAKPOINTS.md ? 16 : 24;
  axisTitle.align = 'left';
  axisTitle.strokeWidth = 0;
  axisTitle.fill = am4core.color(themeUI.rawColors.text);
};
export const createLegend = (chart: am4charts.Chart, themeUI) => {
  chart.legend = new am4charts.Legend();
  chart.legend.position = window.innerWidth <= RESPONSIVE_BREAKPOINTS.md ? 'bottom' : 'top';

  const marker = chart.legend.markers.template.children.getIndex(0);
  //@ts-ignore
  marker?.cornerRadius(12, 12, 12, 12);
  chart.legend.markers.template.width = 8;
  chart.legend.markers.template.height = 8;
  chart.legend.labels.template.fill = am4core.color(themeUI.rawColors.text);
};
export const styleChart = (chart: am4charts.XYChart) => {
  window.innerWidth <= RESPONSIVE_BREAKPOINTS.md ? chart.padding(22, 16, 16, 16) : chart.padding(30, 30, 25, 30);
  chart.responsive.enabled = true;
  chart.leftAxesContainer.layout = 'vertical';
  chart.fontFamily = 'Inter';
};

export const attachSeriesHoverEffect = (series: am4charts.ColumnSeries, themeUI) => {
  const seriesHoverState = series.columns.template.states.create('hover');
  seriesHoverState.properties.strokeWidth = 0;
  seriesHoverState.properties.fill = am4core.color(themeUI.rawColors.text);
};

export const createCursor = (chart: am4charts.XYChart, options?: Partial<am4charts.XYCursor>) => {
  chart.cursor = new am4charts.XYCursor();
  const cursor = chart.cursor;
  cursor.lineX.disabled = true;
  cursor.lineY.disabled = true;
  cursor.behavior = 'none';

  Object.assign(cursor, options);
};

export const createSeries = (chart: am4charts.XYChart, themeUI, options?: Partial<am4charts.ColumnSeries>) => {
  const series = chart.series.push(new am4charts.ColumnSeries());
  series.clustered = false;
  Object.assign(series, options);
  attachSeriesHoverEffect(series, themeUI);
  return series;
};

export const attachData = (chart: am4charts.XYChart, data: any) => {
  chart.data = data;
};
