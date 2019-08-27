import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-luckynames',
  templateUrl: './luckynames.component.html',
  styleUrls: ['./luckynames.component.css']
})
export class LuckynamesComponent implements OnInit {

  constructor() { }

  public charValue = [{
    "character": ["A", "I", "J", "Q", "Y"],
    "value": 1
  },{
    "character": ["B", "K", "R"],
    "value": 2
  },{
    "character": ["C", "G", "L", "S"],
    "value": 3
  },,{
    "character": ["D", "M", "T"],
    "value": 4
  },{
    "character": ["E", "H", "N", "X"],
    "value": 5
  },{
    "character": ["U", "V", "W"],
    "value": 6
  },{
    "character": ["O", "Z"],
    "value": 7
  },{
    "character": ["F", "P"],
    "value": 8
  },{
    "character": [' '],
    "value": 9
  }];

  public luckyNames = [{
    "id": "1",
    "name": "aabha",
    "meaning": "light",
  },{
    "id": "2",
    "name": "aabharan",
    "meaning": "jewel",
  },{
    "id": "3",
    "name": "aabheer",
    "meaning": "a cow herd",
  },{
    "id": "4",
    "name": "aabha",
    "meaning": "light",
  },{
    "id": "5",
    "name": "aachman",
    "meaning": "intake of a sip of water before a yagya or puja",
  },{
    "id": "6",
    "name": "aadarsh",
    "meaning": "ideal, one who has principles",
  },{
    "id": "7",
    "name": "aadhira",
    "meaning": "moon",
  },{
    "id": "8",
    "name": "aadhishankar",
    "meaning": "sri shankaracharya, founder of adwaitha philosophy",
  },{
    "id": "9",
    "name": "aadhunik",
    "meaning": "modern, new",
  },{
    "id": "10",
    "name": "aadi",
    "meaning": "first, most important",
  },{
    "id": "11",
    "name": "aadidev",
    "meaning": "the first god",
  },{
    "id": "12",
    "name": "aadinath",
    "meaning": "supreme ruler of the universe, the first god",
  },{
    "id": "13",
    "name": "aadit",
    "meaning": "peak",
  },{
    "id": "14",
    "name": "aaditeya",
    "meaning": "son of aditi",
  },{
    "id": "15",
    "name": "aaditya",
    "meaning": "the sun",
  },{
    "id": "16",
    "name": "aadya",
    "meaning": "the earliest, lord shiva",
  },{
    "id": "17",
    "name": "aafreen",
    "meaning": "encouragement",
  },{
    "id": "18",
    "name": "aagam",
    "meaning": "coming, arrival",
  },{
    "id": "19",
    "name": "aagneya",
    "meaning": "son of the fire",
  },{
    "id": "20",
    "name": "aahlaad",
    "meaning": "delight",
  }]
  
  // public names = "aahlaadith = joyous person aahva = beloved aahwaanith = one who has been invited,wanted aakaash = sky aakanksh = desire aakar = shape aakarshan = attraction aakash = the sky aalam = ruler, king, the whole world aalap = prelude to a raga aalok = cry of victory aamod = pleasant ,accept aanand = joy aanandswarup = full of joy aandaleeb = the bulbul bird aanjaneya = son of anjani (hanuman) aapt = trustworthy aaradhak = worshipper aarnav = ocean aarth = meaning, wealth aashish = blessings aashman = son of the sun aashutosh = who is easily pleased aastik = who has faith in god aatish = explosive, dynamic person aatmaj = son, beloved to soul aatreya = name of a sage aayu = lifespan aayushmaan = with long life";

  // splitNames(){
  //   let a = this.names.split(' = ');
  //   console.log();
  // }

  ngOnInit() {
  }

}
