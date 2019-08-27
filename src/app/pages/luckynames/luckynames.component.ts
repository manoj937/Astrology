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

  ngOnInit() {
    this.luckyName.getConfig().subscribe(data => this.luckyNames = data);
  }

}
