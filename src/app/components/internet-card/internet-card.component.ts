import { SpeedPipe } from '@/shared/pipes/speed.pipe';
import { IInternetTariff } from '@/types/internetTarrif';
import { Component, Input } from '@angular/core';
import { AppIntl } from '../../../assets/i10n/app.intl';

@Component({
  selector: 'app-internet-card',
  standalone: true,
  imports: [SpeedPipe],
  templateUrl: './internet-card.component.html',
})
export class InternetCardComponent {
  @Input() tariff: IInternetTariff | undefined;

  constructor(public intl: AppIntl) {}
}
