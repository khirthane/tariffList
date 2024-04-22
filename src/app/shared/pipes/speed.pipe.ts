import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secsToSpeed',
  standalone: true,
})
export class SpeedPipe implements PipeTransform {
  transform(speed: number | undefined): string {
    if (!speed || speed <= 0) {
      return 'N/A';
    }

    const MbpsSpeed = speed / 1000000;

    return MbpsSpeed.toFixed(0) + ' Mbps';
  }
}
