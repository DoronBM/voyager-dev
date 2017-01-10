import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TripsRepository, Trip } from '../../providers/trips-repository';
import { TripPage } from "../trip/trip";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers: [TripsRepository]
})
export class HomePage {

    private trips;

    constructor(public navCtrl: NavController, private repository: TripsRepository) {
        this.trips = this.repository.getTrips();
    }

    ionViewDidLoad() {

        
    }

    addItem() {

    }

    viewItem(item: Trip) {
        item.isSelected = !item.isSelected;

    }

    navToTrip(item: Trip) {
        this.navCtrl.push(TripPage, {
            trip: item,
        });
    }
}