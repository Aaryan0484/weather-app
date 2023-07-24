import { WeatherService } from 'src/app/services/weather.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  myWeather: any;
  temperature: number = 0;
  feelsLikeTemp: number = 0;
  humidity: number = 0;
  pressure: number = 0;
  summary: string = '';
  iconURL: string = '';
  city: string = '';
  units: string = 'imperial';
  cityName: string = ''; // Add this line to declare the cityName variable

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    //this.getWeather();
  }

  onSubmit() {
    this.getWeather(this.city, this.units); // Provide both city and units
  }

  private getWeather(city: string, units: string) { // Add 'units' parameter here
    this.weatherService.getweather(city, units).subscribe({
      next: (res) => {
        console.log(res);
        this.myWeather = res;
        this.temperature = this.convertTemperature();
        this.feelsLikeTemp = this.convertTemperature();
        this.humidity = this.myWeather.main.humidity;
        this.pressure = this.myWeather.main.pressure;
        this.summary = this.myWeather.weather[0].main;

        this.iconURL = 'https://openweathermap.org/img/wn/' + this.myWeather.weather[0].icon + '@2x.png';
      }
    });
  }

  convertTemperature(): number {
    return parseFloat(((this.temperature - 32) * 5 / 9).toFixed(2));
  }
}
