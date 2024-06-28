import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-user-form',
  templateUrl: './new-user-form.component.html',
  styleUrls: ['./new-user-form.component.scss'],
})
export class NewUserFormComponent  implements OnInit {

  areTermsAccepted = false;

  constructor() { }

  ngOnInit() {}

}
