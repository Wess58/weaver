import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'figureFormatter',
  standalone: false
})
export class FigureFormatterPipe implements PipeTransform {

  transform(value: any): any {
    if (value) {

      value = Math.floor(value).toString();
      if (value.length > 12) {
        value = (value / 1000000000000);
        return value % 1 !== 0 ? value.toFixed(1).replace(/\.0$/, '') + 'T' : value + 'T';
        // return Math.floor((value / 1000000000)) + 'B';
      } else if (value.length > 9) {
        value = (value / 1000000000);
        return value % 1 !== 0 ? value.toFixed(1).replace(/\.0$/, '') + 'B' : value + 'B';
        // return Math.floor((value / 1000000000)) + 'B';
      } else if (value.length > 6) {
        value = (value / 1000000);
        return value % 1 !== 0 ? value.toFixed(1).replace(/\.0$/, '') + 'M' : value + 'M';
        // return Math.floor((value / 1000000)) + 'M';
      } else if (value.length > 3) {
        // value = String(value / 1000).match(/^\d+(\.([1-9]{0,1}))?$/);
        // return (!value[0].includes('.') || !value[1].length) ? value[0].replace('.','') + 'K' : value[0] + 'K';
        value = (value / 1000);
        return value % 1 !== 0 ? value.toFixed(1).replace(/\.0$/, '') + 'K' : value + 'K';
        // return Math.floor((value / 1000)) + 'K';
      } else {
        return value;
      }
    } else {
      return 0;

    }
  }


}
