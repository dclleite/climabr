import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { City } from '@entities/city.model';
import { SearchCityService } from '@services/search-city.service';
import { CityStorageService } from '@services/city-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  errorMessage = null;
  cities: City[] = [];

  constructor(
    private readonly cityService: SearchCityService,
    private readonly router: Router,
    private cityStorageService: CityStorageService
  ) { }

  async ionViewDidEnter() {
    const storageCities = await this.cityStorageService.getSotageCities();
    this.cities = storageCities || [];
  }

  async onSearch(query: string) {
    try {
      this.errorMessage = null;
      this.cities = query
        ? await this.cityService.searchByName(query)
        : await this.cityStorageService.getSotageCities();
    } catch (error) {
      this.errorMessage = error.message
    }
  }

  async onSelect(city: City) {
    this.cityStorageService.addNewCity(city);
    await this.router.navigateByUrl(`/weather/${city.id}`, { replaceUrl: true })
  }
}
