import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchCityService } from '@services/search-city.service';
import { LoadWeatherService } from '@services/load-weather.service';
import { CityStorageService } from '@services/city-storage.service';
import { FakeWeatherRepository } from './data/fake/fake-weather-repository';
import { LocalCityRepository } from './data/local/local-city-repository';
import { RemoteWeatherRepository } from './data/remote/remote-weather-repository';

const createSearchCityService = () => {
  return new SearchCityService(new LocalCityRepository())
}

const createLoadWeatherService = (http: HttpClient) => {
  return new LoadWeatherService(new RemoteWeatherRepository(http))
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), HttpClientModule, AppRoutingModule,  IonicStorageModule.forRoot()],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: SearchCityService, useFactory: createSearchCityService },
    { provide: LoadWeatherService, useFactory: createLoadWeatherService, deps: [HttpClient] },
    CityStorageService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
