import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {LoginComponent} from '../login/login.component';
import {RegisterComponent} from '../register/register.component';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

    onRegister() {
        this.dialog.open(RegisterComponent);
    }

    onLogin() {
      this.dialog.open(LoginComponent);
    }

}
