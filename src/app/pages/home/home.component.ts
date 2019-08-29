import {
  Component,
  OnInit
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {Router} from "@angular/router";
import { AmazingTimePickerService } from 'amazing-time-picker';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name: any;
  gender: any;
  birthDay: any;
  birthTime: any ="10.00";
  birthPlace: any;
  emailAddress: any;
  mobile: any;
  rashi: any;
  birthStar: any;
  maritialStatus: any;
  questions: any;

  constructor(private http: HttpClient,private atp: AmazingTimePickerService) {}

  open() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      (<HTMLInputElement>document.getElementById('time')).value = time;
    });
  }

  public signs = [{
    "image": "aries",
    "raasi": "மேஷம்"
  }, {
    "image": "taurus",
    "raasi": "ரிஷபம்"
  }, {
    "image": "gemini",
    "raasi": "மிதுனம்"
  }, {
    "image": "cancer",
    "raasi": "கடகம்"
  }, {
    "image": "leo",
    "raasi": "சிம்மம்"
  }, {
    "image": "virgo",
    "raasi": "கன்னி"
  }, {
    "image": "libra",
    "raasi": "துலாம்"
  }, {
    "image": "scorpio",
    "raasi": "விருச்சிகம்"
  }, {
    "image": "sagittarius",
    "raasi": "தனுசு"
  }, {
    "image": "capricorn",
    "raasi": "மகரம்"
  }, {
    "image": "aquarius",
    "raasi": "கும்பம்"
  }, {
    "image": "pisces",
    "raasi": "மீனம்"
  }]

  ngOnInit() {}

  onSubmit() {

    let data = {};
    data['name'] = this.name;
    data['gender'] = this.gender;
    data['birthDay'] = this.birthDay;
    data['birthTime'] = this.birthTime;
    data['birthPlace'] = this.birthPlace;
    data['birthStar'] = this.birthStar;
    data['emailAddress'] = this.emailAddress;
    data['mobile'] = this.mobile;
    data['rashi'] = this.rashi;
    data['maritialStatus'] = this.maritialStatus;
    data['questions'] = this.questions;

    const paymentData = {
          purpose : 'Astro Payment',
          amount: '500',
          buyer_name: this.name,
          email: this.emailAddress,
          phone: this.mobile,
          redirect_url : `http://emailserverapp.herokuapp.com/callback`,
          webhook_url: '/webhook/',
          userData : data
    }

    if(data['name'] && data['gender'] && data['birthDay'] && data['birthPlace'] && data['birthStar'] && data['emailAddress'] && data['mobile'] && data['maritialStatus']){
      return this.http.post(`http://emailserverapp.herokuapp.com/pay`, paymentData, {}).subscribe((response) => {
      })
    }else{
      alert("FILL ALL DETAILS");
    }
  }

}
