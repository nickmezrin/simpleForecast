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
import { FavService } from '../services/fav.service';
import { PlaceViewComponent } from '../components/place-view.component';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PlaceInfoPage,
    FavPage,
    PlaceViewComponent
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
    PlaceInfoPage,
    PlaceViewComponent
  ],
  providers: [
    StatusBar,
    GeoService,
    SplashScreen,
    FavService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
