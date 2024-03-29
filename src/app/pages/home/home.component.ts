import {
  Component,
  OnInit
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {Router} from "@angular/router";
import { AmazingTimePickerService } from 'amazing-time-picker';
import { commonService } from '../../common.service';

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

  raasipl: boolean = true;
  public plan={};

  constructor(private http: HttpClient,private atp: AmazingTimePickerService, private router: Router, public sign: commonService) {}

  open() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      (<HTMLInputElement>document.getElementById('time')).value = time;
    });
  }

  public signs;

  ngOnInit() {
    this.sign.getConfig('assets/monthlyhoroscope.json').subscribe(data => {
      this.signs = data;
    });
  }

  back(){
    this.raasipl = true;
  }

  raasiplan(raasi){
    this.raasipl = false;
    for(let sign of this.signs){
      if(raasi === sign.image){
        this.plan = sign;
      }
    }
  }

  onSubmit() {

    var forms = document.getElementsByClassName('needs-validation');
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });

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
          redirect_url : `https://emailserverapp.herokuapp.com/callback`,
          webhook_url: '/webhook/',
          userData : data
    }

    if(data['name'] && data['gender'] && data['birthDay'] && data['birthPlace'] && data['emailAddress'] && data['mobile'] && data['maritialStatus']){
      return this.http.post(`https://emailserverapp.herokuapp.com/pay?type=1`, paymentData, {}).subscribe((response) => {
        window.location.href = response.toString();
      })
    }else{
      alert("FILL ALL DETAILS");
    }
  }

}
