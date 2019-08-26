import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  public signs = [{
    "image": "aries",
    "raasi": "மேஷம்"
  },{
    "image": "taurus",
    "raasi": "ரிஷபம்"
  },{
    "image": "gemini",
    "raasi": "மிதுனம்"
  },{
    "image": "cancer",
    "raasi": "கடகம்"
  },{
    "image": "leo",
    "raasi": "சிம்மம்"
  },{
    "image": "virgo",
    "raasi": "கன்னி"
  },{
    "image": "libra",
    "raasi": "துலாம்"
  },{
    "image": "scorpio",
    "raasi": "விருச்சிகம்"
  },{
    "image": "sagittarius",
    "raasi": "தனுசு"
  },{
    "image": "capricorn",
    "raasi": "மகரம்"
  },{
    "image": "aquarius",
    "raasi": "கும்பம்"
  },{
    "image": "pisces",
    "raasi": "மீனம்"
  }]
  
  ngOnInit() {
  }

}
