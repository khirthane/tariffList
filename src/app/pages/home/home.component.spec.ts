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
  });

  it('should create home component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch internet offers on init and assign data to internetTariffList', waitForAsync(() => {
    const mockData: IInternetTariff[] = [
      {
        id: 1,
        name: 'Tarif Name a',
        downloadSpeed: 12000000,
        uploadSpeed: 6000000,
        benefits: [
          'Tarif benefit 1',
          'Tarif benefit 2',
          'Tarif benefit 3',
          'Tarif benefit 4',
        ],
        price: 123.45,
      },
    ];

    spyOn(internetService, 'getInternetOffers').and.returnValue(of(mockData));

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.internetTariffList).toEqual(mockData);
    });
  }));
});
