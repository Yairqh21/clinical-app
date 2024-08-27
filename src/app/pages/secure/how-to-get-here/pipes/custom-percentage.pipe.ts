import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customPercentage'
})
export class CustomPercentagePipe implements PipeTransform {

  transform(value: number, maxValue: number = 18): string {
    if (value == null || maxValue <= 0) {
      return '0%';
    }
    const percentage = (value / maxValue) * 100;
    return `${Math.round(percentage)}%`;
  }

}
