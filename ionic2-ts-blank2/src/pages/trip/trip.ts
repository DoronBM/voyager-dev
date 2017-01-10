import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TripsRepository, Trip } from '../../providers/trips-repository';

declare var google;
/*
  Generated class for the Trip page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-trip',
  templateUrl: 'trip.html'
})
export class TripPage {

    private trip: Trip;
    @ViewChild('map') mapElement: ElementRef;
    map: any;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.trip = navParams.get('trip');
    }

  ionViewDidLoad() {
          this.loadMap();
  }

  loadMap():void  {

      let latLng = new google.maps.LatLng(-34.9290, 138.6010);

      let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  }

  addMarker() {

      let marker = new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.DROP,
          position: this.map.getCenter()
      });

      let content = "<h4>Information!</h4>";

      this.addInfoWindow(marker, content);
  }

  addInfoWindow(marker, content) {

      let infoWindow = new google.maps.InfoWindow({
          content: content
      });

      google.maps.event.addListener(marker, 'click', () => {
          infoWindow.open(this.map, marker);
      });

  }

}
