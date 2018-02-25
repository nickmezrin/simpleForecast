import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AgmCoreModule } from '@agm/core';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { GeoService } from '../services/geo.service';
import { HttpModule, Http } from '@angular/http';
import { PlaceInfoPage } from '../pages/place-info/place-info';
import { ChartModule } from 'angular-highcharts';
import { FavPage } from '../pages/fav/fav';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PlaceInfoPage,
    FavPage
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAp0NPMMPfRTmQ86-R7vbfiRkA9MeaxcoU'
    }),
    HttpModule,
    ChartModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FavPage,
    PlaceInfoPage
  ],
  providers: [
    StatusBar,
    GeoService,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
