import { InternetCardComponent } from '@/components/internet-card/internet-card.component';
import { NavbarComponent } from '@/components/navbar/navbar.component';
import { SortList } from '@/constants/sortList';
import { InternetService } from '@/shared/services/internet/internet.service';
import { IInternetTariff } from '@/types/internetTarrif';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EMPTY, catchError } from 'rxjs';
import { AppIntl } from '../../../assets/i10n/app.intl';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, InternetCardComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  internetTariffList: IInternetTariff[] = [];
  filteredTariffList: IInternetTariff[] = [];
  searchTerm: string = '';
  sortType: string = '';
  sortList = Object.values(SortList);

  constructor(public intl: AppIntl, private internetService: InternetService) {}

  ngOnInit(): void {
    this.fetchInternetOffers();
  }

  fetchInternetOffers() {
    this.internetService
      .getInternetOffers()
      .pipe(
        catchError((error) => {
          console.error(error);
          return EMPTY;
        })
      )
      .subscribe((data) => {
        this.internetTariffList = data;
        this.filteredTariffList = [...this.internetTariffList];
      });

    this.onSortList();
  }

  onSortList() {
    switch (this.sortType) {
      case SortList.DownloadSpeed:
        this.filteredTariffList.sort(
          (a, b) => a.downloadSpeed - b.downloadSpeed
        );
        break;
      case SortList.UploadSpeed:
        this.filteredTariffList.sort((a, b) => a.uploadSpeed - b.uploadSpeed);
        break;
      case SortList.Price:
        this.filteredTariffList.sort((a, b) => a.price - b.price);
        break;
      default:
        this.filteredTariffList = [...this.internetTariffList];
        break;
    }
  }
}
