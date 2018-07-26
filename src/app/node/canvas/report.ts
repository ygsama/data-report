import {Dimensions, INode} from '../interface';
import {ContextMenuHelper} from '../../utils/contextMenu';
import {ExplicitRegion} from '../region/region.explicit';
import {Region} from '../region/region';

const ReportTemplate = `
    <div class="report-region">
        <div class="report-canvas">
          <div class="report-box">
             <div class="report-grid">
             <div class="u-edit-mask">
                <div class="mask mask-left"></div>
                <div class="mask mask-right"></div>
                <div class="mask mask-bottom"></div>
                <div class="mask mask-top"></div>
              </div>
             </div>
          </div>
        </div>
    </div>
    `;

export class Report implements INode {
  private _dimensions: Dimensions = {
    width: 960,
    height: 720
  };
  private _scale = 1;
  private _regionActivated = false;
  private _children: Array<Region> = [];


  $element: JQuery;
  $region: JQuery;
  $canvas: JQuery;
  $box: JQuery;
  $grid: JQuery;

  $mask: JQuery;

  activateRegion(region: Region) {
    region.activate();
    const $element: JQuery = region.$element,
      $mask = this.$mask,
      left = $element.position().left,
      top = $element.position().top,
      width = $element.outerWidth(),
      height = $element.outerHeight();
    $mask.find('.mask-left').width(Math.max(0, left));
    $mask.find('.mask-right').css({
      left: left + width
    });
    $mask.find('.mask-bottom').width(width).css({
      left: Math.max(0, left),
      top: top + height
    });
    $mask.find('.mask-top').width(width).height(Math.max(top, 0)).css({
      left: Math.max(0, left)
    });

    this.regionActivated = true;
  }

  regionResize(region: Region) {
    const $element: JQuery = region.$element,
      $mask = this.$mask,
      left = $element.position().left,
      top = $element.position().top,
      width = $element.outerWidth(),
      height = $element.outerHeight();
    $mask.find('.mask-left')
      .width(Math.max(0, left));
    $mask.find('.mask-right')
      .css({
        left: left + width
      });
    $mask.find('.mask-bottom')
      .width(width)
      .css({
        left: Math.max(0, left),
        top: top + height
      });
    $mask.find('.mask-top')
      .width(width)
      .height(Math.max(top, 0))
      .css({
        left: Math.max(0, left)
      });
  }

  get regionActivated() {
    return this._regionActivated;
  }

  set regionActivated(param: boolean) {
    if (this._regionActivated === param) {
      return;
    }
    this._regionActivated = param;
    if (param) {
      this.$element.addClass('activated');
    } else {
      this.$element.removeClass('activated');
    }
  }


  constructor() {
    this.$element = this.$region = $(ReportTemplate);
    this.$canvas = this.$element.find('.report-canvas');
    this.$box = this.$element.find('.report-box');
    this.$grid = this.$element.find('.report-grid');
    this.$mask = this.$element.find('.u-edit-mask');
    this.refresh();

    this.$grid.contextmenu(($event: JQuery.Event) => {
      ContextMenuHelper.open([
        {
          displayName: '新建图表',
          callback: () => {
            console.log('新建图表');
            var graphNode = new ExplicitRegion();
            graphNode.setCoordinates($event.offsetX, $event.offsetY);
            graphNode.refresh();
            this.addChild(graphNode);
            ContextMenuHelper.close();
          }
        }, {
          displayName: '新建文本',
          callback: () => {
            console.log('新建图表');
            // var graphNode = new RegionText();
            // graphNode.coordinates($event.offsetX, $event.offsetY);
            // graphNode.refresh();
            // this.addChild(graphNode);
            // ContextMenuHelper.close();
          }
        }, {
          displayName: '剪切',
          shortcut: 'Ctrl+X'
        }, {
          displayName: '删除',
          shortcut: 'Backspace'
        }, 'split',
        {
          displayName: '创建'
        }
      ], $event.pageX, $event.pageY, $event);
      return false;
    });


    this._init();
  }

  private _init() {
    this.$grid.click(($event) => {
      console.log('click');
      if ($event.target === this.$grid[0]) {
        this.select();
      }
    });
    this.$mask.click(() => {
      this.regionActivated = false;
    });
  }

  set width(width: number) {
    this._dimensions.width = width;
  }

  set height(height: number) {
    this._dimensions.height = height;
  }

  get scale() {
    return this._scale;
  }

  set scale(param: number) {
    this._scale = param / 100;
    this.refresh();
  }

  refresh() {
    const width = this._dimensions.width, height = this._dimensions.height;

    this._setDim(this.$region, width * this.scale + 50, height * this.scale + 30);
    this._setDim(this.$canvas, width * this.scale, height * this.scale);
    this.$box.css('transform', `translate(-50%, -50%) scale(${this.scale})`);
    this._setDim(this.$grid, width, height);
  }

  private _setDim($ele, width, height) {
    $ele.css('width', width).css('height', height);
  }

  addChild(child: Region) {
    child.report = this;
    this._children.push(child);
    this.$grid.append(child.$element);
  }

  select() {
    this._children.forEach((value) => {
      value.unselect();
    });
  }

  unselect() {

  }
}

class RootNode implements INode {
  template = `
<div class="report-canvas">
</div>
    `;
}
