import { Component, input } from '@angular/core';
import {HousingLocationInfo} from './housinglocation';
import {RouterLink} from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-housing-location',
  imports: [RouterLink, MatCardModule, MatButtonModule],
  template: `
    <mat-card>
      <img mat-card-image
        [src]="housingLocation().photo"
        alt="Exterior photo of {{ housingLocation().name }}"
        crossorigin
      />
      <mat-card-header>
        <mat-card-title>{{ housingLocation().name }}</mat-card-title>
        <mat-card-subtitle>{{ housingLocation().city }}, {{ housingLocation().state }}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-actions>
        <a mat-button color="primary" [routerLink]="['/details', housingLocation().id]">Learn More</a>
      </mat-card-actions>
    </mat-card>
  `,
  styleUrls: [`./housing-location.css`],
})
export class HousingLocation {
 housingLocation = input.required<HousingLocationInfo>();
}
