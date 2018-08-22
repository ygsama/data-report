import {Type} from '@angular/core';

import {GraphicConfig} from '../../../../layout/sider/graphic.config/graphic.config';


export abstract class HtmlNode implements IContent {
  configClass: Type<GraphicConfig>;

  abstract resize();

  abstract init(option: any);

  abstract update(option: any);

  updateTheme(theme: string) {

  }

  refresh() {
  }

  abstract activate();

  deactivate() {
  }

  render() {
  }

  derender() {
  }

  abstract destroy();

  getOption() {

  }
}
