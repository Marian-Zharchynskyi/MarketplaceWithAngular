import { Injectable, inject } from '@angular/core';
import { HousingLocationInfo } from '../../../features/housing-location/housinglocation';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HousingService {

  url = 'http://localhost:3000/locations';
  private http = inject(HttpClient);

  async getAllHousingLocations(): Promise<HousingLocationInfo[]> {
    return await firstValueFrom(this.http.get<HousingLocationInfo[]>(this.url));
  }

  async getHousingLocationById(id: number): Promise<HousingLocationInfo | undefined> {
    const list = await firstValueFrom(
      this.http.get<HousingLocationInfo[]>(`${this.url}?id=${id}`)
    );
    return list[0] ?? undefined;
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
      `Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`,
    );
  }
}