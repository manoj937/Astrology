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
  public final = "மிக நன்று";
  public finalClass = "success";
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

  groomNatchatram(element){
    this.groomraashi = [];
    let brideStar = (<HTMLSelectElement>document.getElementById('nakshatram')).value;
    let brideRashi = (<HTMLSelectElement>document.getElementById('rashi')).value;
    for(let groommatch of this.marrigedata[1]){
      if(brideStar === groommatch.natchathiram && brideRashi === groommatch.raashi){
        for(let match of groommatch.match){
          if(element.target.value === match.natchathiram){
            this.groomraashi.push(match.raashi);
            this.matchResult = match.matches;
            this.finalr = match.result;
          }
        }
      }
    }
    this.groomraashi = [...new Set(this.groomraashi)];
  }

  groomRashi(element){
    this.groomstar = [];
    let brideStar = (<HTMLSelectElement>document.getElementById('nakshatram')).value;
    let brideRashi = (<HTMLSelectElement>document.getElementById('rashi')).value;
    for(let groommatch of this.marrigedata[1]){
      if(brideStar === groommatch.natchathiram && brideRashi === groommatch.raashi){
        for(let match of groommatch.match){
          if(element.target.value === match.raashi){
            this.groomstar.push(match.natchathiram);
            this.matchResult = match.matches;
            this.finalr = match.result;
          }
        }
      }
    }
    this.groomstar = [...new Set(this.groomstar)];
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
        this.final = "மிக நன்று";
        this.finalClass = "success";
      }else if(this.final =="மத்திமம்"){
        this.final = "நன்று";
        this.finalClass = "warning";
      }else{
        this.final = "பொருத்தம் இல்லை";
        this.finalClass = "danger";
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
