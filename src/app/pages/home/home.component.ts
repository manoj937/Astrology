import {
  Component,
  OnInit
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name: any;
  gender: any;
  birthDay: any;
  birthTime: any;
  birthPlace: any;
  emailAddress: any;
  mobile: any;
  rashi: any;
  birthStar: any;
  maritialStatus: any;
  questions: any;

  constructor(private http: HttpClient) {}

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
    console.log(`name...${this.name}....Gender...${this.gender}.....Birthday...${this.birthDay}
                ${this.birthTime}.....${this.birthPlace}.....${this.birthStar}.....${this.emailAddress}.....
                ${this.mobile}......${this.rashi}.......${this.maritialStatus}......${this.questions}`)
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

    return this.http.post(`http://localhost:8081/sendEmail`, data, {}).subscribe((response) => {
      alert(response['Message']);
    })
  }

}
