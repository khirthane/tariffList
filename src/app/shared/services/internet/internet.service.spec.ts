import { IInternetTariff } from '@/types/internetTarrif';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { InternetService } from './internet.service';

describe('InternetService', () => {
  let service: InternetService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InternetService],
    });
    service = TestBed.inject(InternetService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return internet offers', () => {
    const mockOffers: IInternetTariff[] = [
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

    service.getInternetOffers().subscribe((offers) => {
      expect(offers).toEqual(mockOffers);
    });
    const req = httpMock.expectOne('/assets/mocks/internet.mock.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockOffers);
  });
});
