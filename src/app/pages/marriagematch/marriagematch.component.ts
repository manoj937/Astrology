import { Component, OnInit } from '@angular/core';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { commonService } from '../../common.service';
import {
  HttpClient
} from '@angular/common/http';
@Component({
  selector: 'app-marriagematch',
  templateUrl: './marriagematch.component.html',
  styleUrls: ['./marriagematch.component.css']
})
export class MarriagematchComponent implements OnInit {
  
  constructor(private atp: AmazingTimePickerService, public marriagematch: commonService, private http: HttpClient) { }
  public groomstar = []; 
  public bridestar =[];
  public groomraashi = []; 
  public brideraashi =[];
  public marrigedata;
  public match = 0;
  public matchResult;
  public matchresults;
  public final;
  public successClass = "badge-light";
  public warnClass = "badge-light";
  public dangerClass = "badge-light";
  public finalr;
  bname: any;
  bbirthDay: any;
  bbirthPlace: any;
  bbirthStar: any;
  brashi: any;
  gname: any;
  gbirthDay: any;
  gbirthPlace: any;
  gbirthStar: any;
  grashi: any;
  emailAddress: any;
  mobile: any;
  bbirthTime: any;
  gbirthTime: any;

  ngOnInit() {
    this.reset();
  }

  finalmatch(){
    if((<HTMLSelectElement>document.getElementById('rashi')).value !== '' && (<HTMLSelectElement>document.getElementById('mrashi')).value !== ''
    && (<HTMLSelectElement>document.getElementById('nakshatram')).value !== '' && (<HTMLSelectElement>document.getElementById('mnakshatram')).value !== '') {
      for(let i=0;i<this.marrigedata[1].length;i++){
        if(this.marrigedata[1][i].raashi === (<HTMLSelectElement>document.getElementById('rashi')).value && this.marrigedata[1][i].natchathiram === (<HTMLSelectElement>document.getElementById('nakshatram')).value){
          for(let j=0;j< this.marrigedata[1][i].match.length;j++){
            if(this.marrigedata[1][i].match[j].raashi === (<HTMLSelectElement>document.getElementById('mrashi')).value && this.marrigedata[1][i].match[j].natchathiram === (<HTMLSelectElement>document.getElementById('mnakshatram')).value){
              this.matchResult = this.marrigedata[1][i].match[j].matches;
              this.finalr = this.marrigedata[1][i].match[j].result;
            }
          }
        }
      }
    }
  }

  reset(){
    this.marriagematch.getConfig('assets/marriagematch.json').subscribe(data => {
      this.marrigedata = data;
      this.matchresults = data[0].matches;
      for(let bride of data[1]){
        this.bridestar.push(bride.natchathiram);
        this.brideraashi.push(bride.raashi);
      }
      for(let groom of this.marrigedata[1][0].match){
        this.groomstar.push(groom.natchathiram);
        this.groomraashi.push(groom.raashi);
      }
      this.bridestar = [...new Set(this.bridestar)];
      this.brideraashi = [...new Set(this.brideraashi)];
      this.groomstar = [...new Set(this.groomstar)];
      this.groomraashi = [...new Set(this.groomraashi)];
    });
  }

  brideDetails(e){
      if(e.target.id == 'rashi'){
        this.bridestar = [];
      }else if(e.target.id == 'nakshatram'){
        this.brideraashi = [];
      }
      
      for(let bride of this.marrigedata[1]){
        if( e == '' || e.target.value == ''){
          this.bridestar.push(bride.natchathiram);
          this.brideraashi.push(bride.raashi);
        }else if(e.target.value == bride.raashi){
          this.bridestar.push(bride.natchathiram);
        }else if(e.target.value == bride.natchathiram){
          this.brideraashi.push(bride.raashi);
        }
      }
       this.bridestar = [...new Set(this.bridestar)];
       this.brideraashi = [...new Set(this.brideraashi)];
       this.finalmatch();
  }

  groomDetails(e){
    if(e.target.id == 'mrashi'){
      this.groomstar = [];
    }else if(e.target.id == 'mnakshatram'){
      this.groomraashi = [];
    }
    
    for(let groom of this.marrigedata[1]){
      if(e.target.value == ''){
        this.groomstar.push(groom.natchathiram);
        this.groomraashi.push(groom.raashi);
      }else if(e.target.value == groom.raashi){
        this.groomstar.push(groom.natchathiram);
      }else if(e.target.value == groom.natchathiram){
        this.groomraashi.push(groom.raashi);
      }
    }
     this.groomstar = [...new Set(this.groomstar)];
     this.groomraashi = [...new Set(this.groomraashi)];
     this.finalmatch();
  }

  open(e) {
    const amazingTimePicker = this.atp.open();
    if(e.target.id == 'time'){
      amazingTimePicker.afterClose().subscribe(time => {
        (<HTMLInputElement>document.getElementById('time')).value = time;
        this.bbirthTime = time;
      });
    }else{
      amazingTimePicker.afterClose().subscribe(time => {
        (<HTMLInputElement>document.getElementById('mtime')).value = time;
        this.gbirthTime = time;
      });
    }
  }

  result(){
    this.successClass = "badge-light";
    this.warnClass = "badge-light";
    this.dangerClass = "badge-light";
    if(this.match==undefined || this.matchResult ==undefined){
      alert('Kindly choose raasi or natchatra again');
    }else{
      for(let i=0;i<10;i++){
        (<HTMLInputElement>document.getElementsByClassName('switchbtn')[i]).checked = false;
      }
      this.match = this.matchResult.length;
      for(let checkList of this.matchResult){
        (<HTMLInputElement>document.getElementsByClassName('switchbtn')[checkList-1]).checked = true;
      }
      this.final = this.finalr;
      if(this.final =="உத்தமம்"){
        this.successClass = "badge-success";
      }else if(this.final =="மத்திமம்"){
        this.warnClass = "badge-warning";
      }else{
        this.dangerClass = "badge-danger";
      }
    }
  }

  submit(){
    let br, bn, gr, gn;
    for(let r of this.marrigedata[1]){
      if(r.natchathiram == this.gbirthStar){
        gr = r.star;
      }
      if(r.natchathiram == this.bbirthStar){
        br = r.star;
      }
      if(r.raashi == this.brashi){
        bn = r.sign;
      }
      if(r.raashi == this.grashi){
        gn = r.sign;
      }
    }
    let data = {};
    data['bname'] = this.bname;
    data['bbirthDay'] = this.bbirthDay;
    data['bbirthPlace'] = this.bbirthPlace;
    data['bbirthStar'] = bn;
    data['bbirthTime'] = this.bbirthTime;
    data['brashi'] = br;
    data['gname'] = this.gname;
    data['gbirthDay'] = this.gbirthDay;
    data['gbirthPlace'] = this.gbirthPlace;
    data['gbirthTime'] = this.gbirthTime;
    data['gbirthStar'] = gr;
    data['grashi'] = gn;
    data['emailAddress'] = this.emailAddress;
    data['mobile'] = this.mobile;

    const paymentData = {
      purpose : 'Astro Payment',
      amount: '500',
      buyer_name: `${this.bname}_${this.gname}`,
      email: this.emailAddress,
      phone: this.mobile,
      redirect_url : `https://emailserverapp.herokuapp.com/marriage_match_callback`,
      webhook_url: '/webhook/',
      userData : data
    }

    if(data['bname'] && data['bbirthDay'] && data['bbirthPlace'] && data['bbirthStar'] && data['brashi'] && data['emailAddress']
  && data['gname'] && data['gbirthDay'] && data['gbirthPlace'] && data['gbirthStar'] && data['grashi'] && data['mobile']){
      return this.http.post(`https://emailserverapp.herokuapp.com/pay`, paymentData, {}).subscribe((response) => {
        window.location.href = response.toString();
      })
    }else{
      alert("FILL ALL DETAILS");
    }
  }
}
