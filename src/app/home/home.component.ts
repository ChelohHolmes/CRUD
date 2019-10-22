import { Component, OnInit } from '@angular/core';
import {ReadService} from '../services/read.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    private user: string;
    private sent: any;

  constructor(private http: ReadService) { }

  ngOnInit() {
    this.user = sessionStorage.getItem('user');
    this.http.post().subscribe(data => {
        this.sent = data;
    });
  }

  onClickU(index) {
    // Request para modificar
  }

  onClickD(index) {
    // Request para eliminar
  }

}
