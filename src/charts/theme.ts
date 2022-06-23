import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import { RESPONSIVE_BREAKPOINTS } from 'utils/consts';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function am4themes_nodle(target, color = '#1DB989') {
  const bgColor = am4core.color('#0F1C2A');
  const columnColor = am4core.color(color);
  const fontColor = am4core.color('#878D94');

  if (target instanceof am4charts.XYChart) {
    target.background.fill = bgColor;
    target.padding(30, 15, 25, 15);
  }
  if (target instanceof am4charts.Legend) {
    target.useDefaultMarker = true;
  }

  if (target instanceof am4charts.AxisRenderer) {
    target.fontWeight = 'normal';
    target.stroke = fontColor;
    target.grid.template.disabled = true;
    target.grid.template.location = 0;
    target.marginRight = window.innerWidth <= RESPONSIVE_BREAKPOINTS.md ? 8 : 25;
  }
  if (target instanceof am4charts.ColumnSeries) {
    target.fill = columnColor;
    target.columns.template.column.cornerRadiusTopLeft = 4;
    target.columns.template.column.cornerRadiusTopRight = 4;
    target.tooltipText = `{dateX}\n[bold]{valueY} times[/]`;
    target.columns.template.width = 4;
  }
  if (target instanceof am4charts.DateAxis) {
    //target.groupData = true;
    //target.baseInterval = { timeUnit: 'month', count: 1 };
    //target.groupInterval = { timeUnit: 'month', count: 2 };
  }
}
