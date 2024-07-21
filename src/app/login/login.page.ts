import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  selectedOption: string = 'auth';

  constructor() { }

  ngOnInit() {
  }


  onSelectOption(option: string) {
    this.selectedOption = option;
  }  
}
