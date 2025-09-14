import { Component, inject } from '@angular/core';
import { HousingLocation } from '../housing-location/housing-location';
import {HousingLocationInfo} from '../housing-location/housinglocation';
import {HousingService} from '../housing/housing';

@Component({
  selector: 'app-home',
  imports: [HousingLocation],
  template: `
     <section>
      <form>
        <input type="text" placeholder="Filter by city" />
        <button class="primary" type="button">Search</button>
      </form>
    </section>
    <section class="results">
      @for(housingLocation of housingLocationList; track $index) {
        <app-housing-location [housingLocation]="housingLocation"></app-housing-location>
      }
    </section>
  `,
  styleUrls: ['./home.css'],
})
export class Home {

  housingLocationList: HousingLocationInfo[] = []
  housingService: HousingService = inject(HousingService);

  constructor() {
    this.housingLocationList = this.housingService.getAllHousingLocations();
  }
}
