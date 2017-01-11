import { Component, ViewChild, ElementRef } from '@angular/core';
import { Camera } from 'ionic-native';
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
    private base64Image;
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

      let latLng = new google.maps.LatLng(32.7391, 35.2419);

      let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  }

private addImage(): void {
    Camera.getPicture({
        sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
        destinationType: Camera.DestinationType.DATA_URL
    }).then((imageData) => {
        this.base64Image = 'data:image/jpeg;base64,' + imageData;
        //this.base64Image = imageURL;
        //console.log("url:" + base64Image);
        this.addMarker();
    }, (err) => {
        console.log(err);
    });
}

  private addMarker() {

      let mImage = {
          url: this.base64Image,
          // This marker is 20 pixels wide by 32 pixels high.
          // The origin for this image is (0, 0).
          origin: new google.maps.Point(0, 0),
          // The anchor for this image is the base of the flagpole at (0, 32).
          anchor: new google.maps.Point(0, 32),
          scaledSize: new google.maps.Size(25,32)
      };

      let marker = new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.DROP,
          position: this.map.getCenter(),
          icon: mImage
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
