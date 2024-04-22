import { SortList } from '@/constants/sortList';
import { InternetService } from '@/shared/services/internet/internet.service';
import { IInternetTariff } from '@/types/internetTarrif';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppIntl } from '../../../assets/i10n/app.intl';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let internetService: InternetService;
  let mockData: IInternetTariff[];

  beforeEach(async () => {
    const internetServiceSpy = jasmine.createSpyObj('InternetService', [
      'getInternetOffers',
    ]);

    TestBed.configureTestingModule({
      declarations: [],
      providers: [HomeComponent, InternetService, AppIntl],
      imports: [CommonModule, HttpClientTestingModule], // Include for mocking HttpClient
    });

    internetService = TestBed.inject(InternetService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    mockData = [
      {
        id: 1,
        name: 'Tariff Name a',
        downloadSpeed: 12000000,
        uploadSpeed: 6000000,
        benefits: ['Tariff benefit 1'],
        price: 123.45,
      },
      {
        id: 2,
        name: 'GigaZuhause 50 cables',
        downloadSpeed: 50000000,
        uploadSpeed: 4000000,
        benefits: ['Tariff benefit 1'],
        price: 90.0,
      },
    ];
  });

  it('should create home component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch internet offers on init and assign data to internetTariffList', waitForAsync(() => {
    spyOn(internetService, 'getInternetOffers').and.returnValue(of(mockData));

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.internetTariffList).toEqual(mockData);
    });
  }));

  it('should sort internet offers by Upload speed', () => {
    component.filteredTariffList = mockData;

    component.sortType = SortList.UploadSpeed;
    component.onSortList();

    expect(component.filteredTariffList).toEqual([
      {
        id: 2,
        name: 'GigaZuhause 50 cables',
        downloadSpeed: 50000000,
        uploadSpeed: 4000000,
        benefits: ['Tariff benefit 1'],
        price: 90.0,
      },
      {
        id: 1,
        name: 'Tariff Name a',
        downloadSpeed: 12000000,
        uploadSpeed: 6000000,
        benefits: ['Tariff benefit 1'],
        price: 123.45,
      },
    ]);
  });

  it('should sort internet offers by Download speed', () => {
    component.filteredTariffList = mockData;

    component.sortType = SortList.DownloadSpeed;
    component.onSortList();

    expect(component.filteredTariffList).toEqual([
      {
        id: 1,
        name: 'Tariff Name a',
        downloadSpeed: 12000000,
        uploadSpeed: 6000000,
        benefits: ['Tariff benefit 1'],
        price: 123.45,
      },
      {
        id: 2,
        name: 'GigaZuhause 50 cables',
        downloadSpeed: 50000000,
        uploadSpeed: 4000000,
        benefits: ['Tariff benefit 1'],
        price: 90.0,
      },
    ]);
  });

  it('should sort internet offers by Price', () => {
    component.filteredTariffList = mockData;

    component.sortType = SortList.Price;
    component.onSortList();

    expect(component.filteredTariffList).toEqual([
      {
        id: 2,
        name: 'GigaZuhause 50 cables',
        downloadSpeed: 50000000,
        uploadSpeed: 4000000,
        benefits: ['Tariff benefit 1'],
        price: 90.0,
      },
      {
        id: 1,
        name: 'Tariff Name a',
        downloadSpeed: 12000000,
        uploadSpeed: 6000000,
        benefits: ['Tariff benefit 1'],
        price: 123.45,
      },
    ]);
  });
});
