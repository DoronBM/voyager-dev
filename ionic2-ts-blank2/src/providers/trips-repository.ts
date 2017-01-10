import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//import { Trip } from "/model/trip"

/*
  Generated class for the TripsRepository provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TripsRepository {

  constructor(public http: Http) {
    console.log('Hello TripsRepository Provider');
  }

  public getTrips(): Trip[] {

      let t1 = new Trip("hee1", "D1");
      let t2 = new Trip("hee2", "D2");
      let t3 = new Trip("hee3", "D3");

      return [t1, t2, t3];
  } 
}

export class Trip {
    public title: string;
    public description: string;
    public isSelected = false;

    constructor(title: string, description: string) {
        this.title = title;
        this.description = description;
    }
}