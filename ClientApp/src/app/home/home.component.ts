import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Covid } from 'src/model/Covid';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild("map", { static: true }) _map;
  @ViewChild("loadingDataContainer", { static: true }) _loadingDataContainer;
  @ViewChild("chartPie", { static: true }) _chartPie;
  firstTime: boolean = false;
  _baseUrl: string;
  covid: Covid;
  context: CanvasRenderingContext2D;
  chartPie: Chart;


  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
    registerLocaleData(localeFr, 'fr');
  }
  ngOnInit(): void {



  }

  activeZone(id) {
    this.leaveZone()
    document.querySelector("#prefecture-" + id).classList.add("is-active")
    document.querySelector("#list-" + id).classList.add("is-active")
  }

  activeFocusZone(id) {
    this.leaveFocusZone()
    this.leaveZone()
    document.querySelector("#prefecture-" + id).classList.add("is-focus-active")
    document.querySelector("#list-" + id).classList.add("is-focus-active")

  }
  leaveZone() {
    (this._map.nativeElement as HTMLDivElement).querySelectorAll(".is-active").forEach(function (item) {
      item.classList.remove("is-active")
    })
  }
  leaveFocusZone() {
    (this._map.nativeElement as HTMLDivElement).querySelectorAll(".is-focus-active").forEach(function (item) {
      item.classList.remove("is-focus-active")
    })
  }
  loadByKey(id: string) {
    this.http.get<Covid>(this._baseUrl + 'covid/' + id).subscribe(result => {
      this.covid = result;
      let datasets = [
        {
          label: "Covid-19",
          borderWidth: 0,
          backgroundColor: [
            '#e3e3e3',
            '#4acccd',
            '#fcc468',
          ],
          data: [this.covid.covid.totalDeces, this.covid.covid.totalVaccin, this.covid.covid.totalCas]
        }
      ];
      this.loadChart([
        "Total Décès",
        "Total Vaccin",
        "Total Cas"
      ], datasets)
    }, error => console.error(error));
  }
  pathEnter($event) {
    $event.preventDefault()
    let id = $event.target.id.replace("prefecture-", '')
    this.activeZone(id)
  }
  pathLeave($event) {
    $event.preventDefault()
    this.leaveZone()
  }
  pathClick($event) {
    $event.preventDefault()
    let id = $event.target.id.replace("prefecture-", '')
    this.activeFocusZone(id)

    let d = (this._loadingDataContainer.nativeElement as HTMLDivElement)
    d.style.display = 'unset'
    d.className = d.className.split(" wow animate__animated animate__backInRight")[0] + " wow animate__animated animate__backInRight"
    this.loadByKey(id);
  }
  linkEnter($event) {
    $event.preventDefault()
    let id = $event.target.id.replace("list-", '')
    this.activeZone(id)
  }
  linkClick($event) {
    $event.preventDefault()
    let id = $event.target.id.replace("list-", '')
    this.activeFocusZone(id)

    let d = (this._loadingDataContainer.nativeElement as HTMLDivElement)
    d.style.display = 'unset'
    d.className = d.className.split(" wow animate__animated animate__backInRight")[0] + " wow animate__animated animate__backInRight"
    this.loadByKey(id);
  }
  linkLeave($event) {
    $event.preventDefault()
    this.leaveZone()
  }
  loadChart(labels: string[], datasets: any[]) {
    if (this.firstTime) this.chartPie.destroy();
    else this.firstTime = true;
    this.context = (this._chartPie.nativeElement as HTMLCanvasElement).getContext('2d');
    this.chartPie = new Chart(this.context, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: datasets
      },

    });

  }
}
