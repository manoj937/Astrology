import { Component, OnInit } from '@angular/core';
import { LuckynamesService } from '../../luckynames.service'

@Component({
  selector: 'app-luckynames',
  templateUrl: './luckynames.component.html',
  styleUrls: ['./luckynames.component.css']
})
export class LuckynamesComponent implements OnInit {

  constructor(public luckyName: LuckynamesService) { }

  public luckyNames;
  public isLoading = true;
  public alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  public names;

  luckynames(e){
    e.target.innerHTML == "Girls"?this.names=this.luckyNames[1].girls:this.names=this.luckyNames[0].boys;
    for(let i=0; i<document.getElementsByClassName('nav-link').length;i++){
      document.getElementsByClassName('nav-link')[i].classList.remove('active');
    }
    for(let i=0; i<document.getElementsByClassName('sort').length;i++){
      document.getElementsByClassName('sort')[i].classList.remove('active');
    }
    e.target.classList.add('active');
  }

  sort(e){
    let firstLetter = e.target.innerHTML;
    let sortNames = this.luckyNames;
    let resultArr =[];
    for(let i=0; i<document.getElementsByClassName('sort').length;i++){
      document.getElementsByClassName('sort')[i].classList.remove('active');
    }
    document.querySelectorAll('.nav-link.active')[0].innerHTML === 'Boys'?resultArr = this.commonIterate(sortNames[0].boys, firstLetter, resultArr):resultArr = this.commonIterate(sortNames[1].girls, firstLetter, resultArr);
    this.names = resultArr;
    e.target.classList.add('active');
  }

  commonIterate(sortNames, firstLetter, resultArr){
    let m = 0;
    for(let name in sortNames){
      if(sortNames[name].name[0] == firstLetter.toLowerCase() || sortNames[name].name[0] == firstLetter.toUpperCase()){
        m++;
        sortNames[name].id = m;
        resultArr.push(sortNames[name]);
      }
    }
    return resultArr;
  }

  ngOnInit() {
    this.luckyName.getConfig().subscribe(data => {
      this.luckyNames = data;
      this.names = this.luckyNames[0].boys;
      this.isLoading = false;
    });
  }

}
