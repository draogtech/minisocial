import {Component, OnInit} from '@angular/core';
import {ApiService} from './api.service';
import { ActivatedRoute } from '@angular/router';
import {analyzeAndValidateNgModules} from "@angular/compiler";

@Component({
  selector: 'app-profile',
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>
          <h4>Profile</h4>
        </mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <mat-list role="list">
          <mat-list-item role="listitem">Name: {{profile.name}} </mat-list-item>
          <mat-list-item role="listitem">Email: {{ profile.email }}</mat-list-item>
          <mat-list-item role="listitem">Description: {{ profile.description }}</mat-list-item>
        </mat-list>
      </mat-card-content>
      </mat-card>
    <mat-card>
      <mat-card-header>
        <mat-card-title>
          <h4>Post</h4>
        </mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <app-message></app-message>
      </mat-card-content>
    </mat-card>
  `
})
export class ProfileComponent implements OnInit{

  constructor( private apiService: ApiService, private route: ActivatedRoute) {}

  profile: any = {};

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.apiService.getProfile(id).subscribe(data => {
     this.profile = data;
    });

  }

}
