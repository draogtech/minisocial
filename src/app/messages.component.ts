import {Component, OnInit} from '@angular/core';
import { ApiService } from './api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-message',
  template: `
  <div *ngFor="let message of apiService.messages">
    <mat-card>{{ message.message }}</mat-card>
  </div>`
})
export class MessagesComponent implements OnInit{

  constructor( public apiService: ApiService, private route: ActivatedRoute){}

  ngOnInit() {
    var userId = this.route.snapshot.params.id;
    this.apiService.getMessage(userId);
  }
}
