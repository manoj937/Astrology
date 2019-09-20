import { Component, OnInit } from '@angular/core';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { commonService } from '../../common.service';
@Component({
  selector: 'app-marriagematch',
  templateUrl: './marriagematch.component.html',
  styleUrls: ['./marriagematch.component.css']
})
export class MarriagematchComponent implements OnInit {

  constructor(private atp: AmazingTimePickerService, public marriagematch: commonService) { }
  public groomstar = []; 
  public bridestar =[];
  public groomraashi = []; 
  public brideraashi =[];
  public marrigedata;

  ngOnInit() {
    this.reset();
  }

  reset(){
    this.marriagematch.getConfig('assets/marriagematch.json').subscribe(data => {
      this.marrigedata = data;
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
          }
        }
      }
    }
    this.groomstar = [...new Set(this.groomstar)];
  }

  open() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      (<HTMLInputElement>document.getElementById('time')).value = time;
    });
  }
}
