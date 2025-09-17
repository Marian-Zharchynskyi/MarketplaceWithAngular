import { Component, inject } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HousingService} from '../../core/services/housing/housing.service';
import {HousingLocationInfo} from '../housing-location/housinglocation';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-details',
  imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <mat-card *ngIf="housingLocation as hl">
      <img mat-card-image [src]="hl.photo" alt="Exterior photo of {{ hl.name }}" crossorigin />
      <mat-card-header>
        <mat-card-title>{{ hl.name }}</mat-card-title>
        <mat-card-subtitle>{{ hl.city }}, {{ hl.state }}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <ul>
          <li>Units available: {{ hl.availableUnits }}</li>
          <li>Wifi: {{ hl.wifi }}</li>
          <li>Laundry: {{ hl.laundry }}</li>
        </ul>
      </mat-card-content>
      <mat-card-content>
        <form class="apply-form" [formGroup]="applyForm" (submit)="submitApplication()">
          <div class="form-row">
            <mat-form-field appearance="outline">
              <mat-label>First Name</mat-label>
              <input matInput type="text" formControlName="firstName" />
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Last Name</mat-label>
              <input matInput type="text" formControlName="lastName" />
            </mat-form-field>
          </div>
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Email</mat-label>
            <input matInput type="email" formControlName="email" />
          </mat-form-field>
          <div class="actions">
            <button mat-raised-button color="primary" type="submit">Apply now</button>
          </div>
        </form>
      </mat-card-content>
    </mat-card>
  `,
  styleUrl: './details.css'
})
export class Details {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocationInfo | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  constructor() {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingService.getHousingLocationById(housingLocationId).then((housingLocation) => {
      this.housingLocation = housingLocation;
    });
  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
    );
  }
}
