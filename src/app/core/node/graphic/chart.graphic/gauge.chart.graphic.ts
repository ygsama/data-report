import {Title} from '@core/node/graphic.view/chart/echart.interface/title';
import {Grid} from '@core/node/graphic.view/chart/echart.interface/grid';
import {Axis} from '@core/node/graphic.view/chart/echart.interface/axis';
import {ChartGraphic} from '@core/node/graphic/chart.graphic/chart.graphic';
import {RegionController} from '@core/node/region/region.controller';
import {LineSeriesConfig} from '@core/node/graphic.view/chart/echart.interface/series/line.series';
import {Chart} from '@core/node/graphic.view/chart/chart';
import {siderLeftComponent} from '../../../../layout/sider/sider.left.component';
import {GaugeConfigComponent} from '../../../../components/graphic.config/chart/gauge.config.component';


export interface ChartLineOption {
  title?: Title;
  dataset?: any;
  grid?: Grid;
  xAxis?: Axis;
  yAxis?: Axis;
  series?: Array<LineSeriesConfig>;
  color?: Array<string>;
}

export class GaugeChartGraphic extends ChartGraphic {
  constructor(region: RegionController) {
    super(region);
  }


  init(option?: any) {
    this._chart = new Chart(this);
    this._configComponentRef = siderLeftComponent.forwardCreateGraphicConfig(GaugeConfigComponent);
    if (option) {
      this.model.importOption(option);
    }
    this.model.register('option', (key, oldValue, newValue) => {
      this.update(newValue);
    });
  }

  getOption() {
    return {
      graphicClass: 'gauge.chart.graphic',
      option: this.model.exportOption()
    };
  }

}
