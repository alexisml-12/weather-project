import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WeatherService } from '../services/weather.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-lwx',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lwx.component.html',
  styleUrl: './lwx.component.css',
  host: {ngSkipHydration: 'true'},
})
export class LwxComponent implements OnInit{

  periods:any[]=[];
  labels:any[]=[];
  temperature:any[]=[];
  temperatureUnit:any[]=[];
  detailedForecast:any[]=[];

  constructor(private weatherService: WeatherService){}

  ngOnInit(): void {
    this.getWeather();


  }

  getWeather(){
    this.weatherService.getForecastColumbia().subscribe({
      next: (result) => {
        for (let i = 0; i < result.properties.periods.length; i++) {
          this.labels.push(result.properties.periods[i].name)
          this.temperature.push(result.properties.periods[i].temperature)
          this.temperatureUnit.push(result.properties.periods[i].temperatureUnit)
          this.detailedForecast.push(result.properties.periods[i].detailedForecast)
        }

        this.ForecastChart(this.labels, this.temperature, this.temperatureUnit, this.detailedForecast);
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

  ForecastChart(labels:any, temperature:any, temperatureUnit:any, detailedForecast:any){
    
    const data = {
      labels: labels,
      datasets: [{
        label: 'Temperature',
        data: temperature,
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };
    let delayed:any;
    new Chart("ColumbiaForecast", {
      type: 'line',
      data: data,
      options: {
        animation: {
          onComplete: () => {
            delayed = true;
          },
          delay: (context) => {
            let delay = 0;
            if (context.type === 'data' && context.mode === 'default' && !delayed) {
              delay = context.dataIndex * 300 + context.datasetIndex * 900;
            }
            return delay;
          },
        },
        indexAxis: 'x',
        scales: {
          x: {
            beginAtZero: true,
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';

                if (label) {
                    label += ': ';
                }
                if (context.parsed.y !== null) {
                    label += context.parsed.y + '°' + temperatureUnit[context.dataIndex];
                }
                return label;
              },
              footer(tooltipItems) {
                let detailed = detailedForecast[tooltipItems[0].dataIndex]
                return detailed;
              },
            }
          }
        }
      }
    });

  }
  
}
