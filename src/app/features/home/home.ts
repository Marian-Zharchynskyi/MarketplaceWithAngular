import { Component, inject } from '@angular/core';
import { HousingLocation } from '../housing-location/housing-location';
import {HousingLocationInfo} from '../housing-location/housinglocation';
import {HousingService} from '../../core/services/housing/housing.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  imports: [HousingLocation, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
     <section>
      <form class="filter-form" (submit)="$event.preventDefault(); filterResults(filter.value)">
        <mat-form-field appearance="outline">
          <mat-label>Filter by city</mat-label>
          <input matInput type="text" #filter />
        </mat-form-field>
        <button mat-raised-button color="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
      @for(housingLocation of filteredLocationList; track $index) {
        <app-housing-location [housingLocation]="housingLocation"></app-housing-location>
      }
    </section>
    `,
  styleUrls: ['./home.css'],
})
export class Home {

  housingLocationList: HousingLocationInfo[] = []
  filteredLocationList: HousingLocationInfo[] = [];
  housingService: HousingService = inject(HousingService);

  constructor() {
    this.housingService
      .getAllHousingLocations()
      .then((housingLocationList: HousingLocationInfo[]) => {
        this.housingLocationList = housingLocationList;
        this.filteredLocationList = housingLocationList;
      });
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }
    this.filteredLocationList = this.housingLocationList.filter((housingLocation) =>
      housingLocation?.city.toLowerCase().includes(text.toLowerCase()),
    );
  }
}
