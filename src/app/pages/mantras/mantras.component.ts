import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mantras',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mantras.component.html',
  styleUrls: ['./mantras.component.css']
})
export class MantrasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
