import {Component, OnInit} from '@angular/core';
import { ApiService } from './api.service';
import {post} from "selenium-webdriver/http";

@Component({
  selector: 'app-post',
  template: `

    <mat-card>
      <mat-card-header>
        <mat-card-title>
          <h4>New Post</h4>
        </mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form>
          <mat-form-field style="width:100%;">
            <textarea matInput [(ngModel)]="postMsg" name="description" placeholder="Post Message"></textarea>
          </mat-form-field>
          <br>
          <button (click)="post()" mat-raised-button color="primary">Post</button>
        </form>

      </mat-card-content>
    </mat-card>

  `
})
export class PostComponent {
  constructor( private apiService: ApiService) {}
  postMsg = '';
  post () {
    this.apiService.postMessage({message: this.postMsg});
  }
}
