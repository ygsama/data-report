import {DataSubject} from '@core/dataset/data.subject/data.subject';

export class ChartDataSubject extends DataSubject {
  constructor() {
    super();
    setInterval(() => {
      this._send({
        // 这里指定了维度名的顺序，从而可以利用默认的维度到坐标轴的映射。
        // 如果不指定 dimensions，也可以通过指定 series.encode 完成映射，参见后文。
        dimensions: [{name: 'product', type: 'ordinal'}, {name: '2015', type: 'int'}, {name: '2016', type: 'int'}, {
          name: '2017',
          type: 'int'
        }],
        source: [
          {product: 'Matcha Latte', '2015': 43.3, '2016': 85.8, '2017': 93.7},
          {product: 'Milk Tea', '2015': Math.random() * 100, '2016': 73.4, '2017': 55.1},
          {product: 'Cheese Cocoa', '2015': Math.random() * 100, '2016': 65.2, '2017': 82.5},
          {product: 'Walnut Brownie', '2015': Math.random() * 100, '2016': 53.9, '2017': 39.1}
        ]
      });
    }, 5000);
  }
}
