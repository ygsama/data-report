import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import {FormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {HttpClientModule} from '@angular/common/http';
import {PieConfigComponent} from './chart/pie.config.component';
import {DataHeaderComponent} from './html/header.component';
import {ColorPickerModule} from '@shared/color-picker/color-picker.module';
import {DataParagraphComponent} from './html/paragraph.component';
import {DataImageComponent} from './html/image.component';
import {BarConfigComponent} from './chart/bar.config.component';
import {NzModalFilterComponent} from './common/filter.modal.component';
import {FilterListComponent} from './common/filter.list.component';
import {ConfigModule} from '../../../components/config/config.module';

const COMPONENTS = [
  PieConfigComponent,
  BarConfigComponent,
  DataHeaderComponent,
  DataParagraphComponent,
  DataImageComponent,
  NzModalFilterComponent,
  FilterListComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ColorPickerModule,
    NgZorroAntdModule,
    ConfigModule
  ],
  entryComponents: [
    ...COMPONENTS
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class GraphicConfigModule {
}