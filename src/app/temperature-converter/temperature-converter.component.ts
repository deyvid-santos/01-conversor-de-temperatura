import { Component } from '@angular/core';

@Component({
  selector: 'app-temperature-converter',
  templateUrl: './temperature-converter.component.html',
  styleUrls: ['./temperature-converter.component.css'],
})
export class TemperatureConverterComponent {
  celsiusValue: number | string = '';
  fahrenheitValue: number | string = '';

  onChangeCelsius(value: string | null): void {
    // TODO: Implementar a lógica para converter o valor recebido em Celsius para Fahrenheit
    // Não se esqueça de limitar as casas decimais a no máximo 1
  }

  onChangeFahrenheit(value: string | null): void {
    // TODO: Implementar a lógica para converter o valor recebido em Fahrenheit para Celsius
    // Não se esqueça de limitar as casas decimais a no máximo 1
  }
}
