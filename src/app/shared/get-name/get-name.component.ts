import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-get-name',
  templateUrl: './get-name.component.html',
  styleUrls: ['./get-name.component.css']
})
export class GetNameComponent implements OnInit {

  @Input() name: string;
  @Output() myEvent: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
