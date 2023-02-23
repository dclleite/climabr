import { Injectable } from '@angular/core';
import { City } from "../entities/city.model";
import { StorageService } from './storage.service';

const CITY_STORAGE_KEY = '@city-storage-key'

@Injectable({
  providedIn: 'root'
})
export class CityStorageService {
  constructor(private storageService: StorageService) { }

  public getSotageCities(): Promise<City[]> {
    return this.storageService.getData(CITY_STORAGE_KEY);
  }

  public async addNewCity(city: City) {
    const cities = await this.getSotageCities() || [];
    if(!cities.find(c => c.id === city.id)) {
      cities.push(city)

      this.storageService.setData(CITY_STORAGE_KEY, cities)
    }
  }
}
