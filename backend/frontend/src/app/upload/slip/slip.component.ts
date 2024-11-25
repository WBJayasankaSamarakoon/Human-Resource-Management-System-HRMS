import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slip',
  templateUrl: './slip.component.html',
  styleUrls: ['./slip.component.scss'],
})
export class SlipComponent implements OnInit {
  employee: any;

  constructor() {}

  ngOnInit(): void {
    // Access employee data from the history state passed from the report component
    this.employee = history.state.employee;
  }
}
