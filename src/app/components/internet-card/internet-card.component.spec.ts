import { IInternetTariff } from '@/types/internetTarrif';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppIntl } from '../../../assets/i10n/app.intl';
import { InternetCardComponent } from './internet-card.component';

describe('InternetCardComponent', () => {
  let component: InternetCardComponent;
  let fixture: ComponentFixture<InternetCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [CommonModule],
      providers: [AppIntl],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternetCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render internet tariff details correctly', () => {
    const mockTariff: IInternetTariff = {
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
    };

    component.tariff = mockTariff;

    fixture.detectChanges();

    const element = fixture.nativeElement;

    expect(element.querySelector('.tariff-count').textContent.trim()).toBe('1');
    expect(element.querySelector('.tariff-name').textContent.trim()).toBe(
      'Tarif Name a'
    );
    expect(
      element.querySelector('.download-speed').textContent.trim()
    ).toContain('12 Mbps');
    expect(element.querySelector('.upload-speed').textContent.trim()).toContain(
      '6 Mbps'
    );

    expect(element.querySelectorAll('.tariff-benefit li').length).toBe(4);
    expect(element.querySelector('.tariff-price').textContent.trim()).toBe(
      '123.45€'
    );
  });

  it('should not render any internet tariff details when tariff is undefined', () => {
    component.tariff = undefined;

    fixture.detectChanges();

    const element = fixture.nativeElement;
    expect(element.querySelector('.card')).toBeFalsy();
  });
});
