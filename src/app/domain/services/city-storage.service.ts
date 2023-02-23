import { Injectable } from '@angular/core';
import { City } from "../entities/city.model";
import { StorageService } from './storage.service';

const CITY_STORAGE_KEY = '@city-storage-key'

@Injectable({
  providedIn: 'root'
})
export class CityStorageService {
  constructor(private storageService: StorageService) { }

  public getSotageCities(): Promise<City[] | null> {
    return this.storageService.getData(CITY_STORAGE_KEY);
  }

  public async addNewCity(city: City) {
    const cities = await this.getSotageCities() || [];

    const indexToRemove = cities.findIndex(c => c.id === city.id);

    // If city already exists in array and it is the first, it does nothing
    if(indexToRemove !== 0) {
      // remove already existing city
      if(indexToRemove !== -1) {
        cities.splice(indexToRemove, 1);
      }

      // Add city to beginning of array
      cities.unshift(city);
      this.storageService.setData(CITY_STORAGE_KEY, cities);
    }
  }
}
