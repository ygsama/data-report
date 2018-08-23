import {Region} from '../../region/region';
import {Chart} from '../../content/chart/chart';
import {siderLeftComponent} from '../../../../layout/sider/sider.left.component';

import {PieConfigComponent} from '../../../../layout/sider/graphic.config/chart/pie.config.component';
import {ChartGraphic} from '@core/node/graphic/chart.graphic/chart.graphic';
import {Title} from '@core/node/content/chart/echart.interface/title';
import {Grid} from '@core/node/content/chart/echart.interface/grid';
import {Axis} from '@core/node/content/chart/echart.interface/axis';
import {PieSeriesConfig} from '@core/node/content/chart/echart.interface/series/pie.series';

export interface ChartPieConfig {
  title?: Title;
  dataset?: any;
  grid?: Grid;
  xAxis?: Axis;
  yAxis?: Axis;
  series?: Array<PieSeriesConfig>;
  color?: Array<string>;
}

export class PieChartGraphic extends ChartGraphic {
  constructor(region: Region) {
    super(region);
  }

  init(option?: any) {
    this._chart = new Chart(this);
    this._configComponentRef = siderLeftComponent.forwardCreateGraphicConfig(PieConfigComponent);
    if (option) {
      this._configComponentRef.instance.writeOption(option);
    }
    this._configComponentRef.instance.graphic = this;
  }

  derender() {
    return {
      graphicClass: 'pie.chart.graphic',
      option: this.getOption(),
    };
  }

}
