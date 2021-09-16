import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Covid } from 'src/model/Covid';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild("map", { static: true }) _map;
  @ViewChild("loadingDataContainer", { static: true }) _loadingDataContainer;
  _baseUrl: string;
  covid: Covid;


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
}
