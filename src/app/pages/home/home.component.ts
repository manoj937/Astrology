import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { commonService } from '../../common.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name: any;
  gender: any;
  birthDay: any;
  birthTime: any = "10:00";
  birthPlace: any;
  emailAddress: any;
  mobile: any;
  rashi: any;
  birthStar: any;
  maritialStatus: any;
  questions: any;

  raasipl: boolean = true;
  public plan: any = {};

  constructor(private http: HttpClient, private router: Router, public sign: commonService) { }

  public signs: any;

  ngOnInit() {
    this.sign.getConfig('assets/monthlyhoroscope.json').subscribe((data: any) => {
      this.signs = data;
    });
  }

  back() {
    this.raasipl = true;
  }

  raasiplan(raasi: any) {
    this.raasipl = false;
    for (let sign of this.signs) {
      if (raasi === sign.image) {
        this.plan = sign;
      }
    }
  }

  onSubmit() {
    const forms = document.getElementsByClassName('needs-validation');
    Array.from(forms).forEach((form: any) => {
      form.addEventListener('submit', (event: any) => {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });

    let data: any = {};
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
      purpose: 'Astro Payment',
      amount: '500',
      buyer_name: this.name,
      email: this.emailAddress,
      phone: this.mobile,
      redirect_url: `${environment.apiUrl}/callback`,
      webhook_url: '/webhook/',
      userData: data
    };

    if (data['name'] && data['gender'] && data['birthDay'] && data['birthPlace'] && data['emailAddress'] && data['mobile'] && data['maritialStatus']) {
      this.http.post(`${environment.apiUrl}/pay?type=1`, paymentData, {}).subscribe((response) => {
        window.location.href = response.toString();
      });
    } else {
      alert("FILL ALL DETAILS");
    }
  }

}
