import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TemperatureConverterComponent } from './temperature-converter.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('TemperatureConverterComponent', () => {
  let component: TemperatureConverterComponent;
  let fixture: ComponentFixture<TemperatureConverterComponent>;
  let celsiusInput: HTMLInputElement;
  let fahrenheitInput: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TemperatureConverterComponent],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TemperatureConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    celsiusInput = fixture.debugElement.query(
      By.css('[data-test-id="celsius-input"]'),
    ).nativeElement;
    fahrenheitInput = fixture.debugElement.query(
      By.css('[data-test-id="fahrenheit-input"]'),
    ).nativeElement;
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve iniciar com ambos os campos vazios', () => {
    expect(celsiusInput.value).toBe('');
    expect(fahrenheitInput.value).toBe('');
  });

  it('deve converter corretamente de Celsius para Fahrenheit', () => {
    celsiusInput.value = '0';
    celsiusInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(fahrenheitInput.value).toBe('32');

    celsiusInput.value = '100';
    celsiusInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(fahrenheitInput.value).toBe('212');

    celsiusInput.value = '37';
    celsiusInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(fahrenheitInput.value).toBe('98.6');
  });

  it('deve converter corretamente de Fahrenheit para Celsius', () => {
    fahrenheitInput.value = '32';
    fahrenheitInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(celsiusInput.value).toBe('0');

    fahrenheitInput.value = '212';
    fahrenheitInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(celsiusInput.value).toBe('100');

    fahrenheitInput.value = '98.6';
    fahrenheitInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(celsiusInput.value).toBe('37');
  });
});
