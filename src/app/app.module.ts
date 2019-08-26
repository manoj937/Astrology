import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { NumerologyComponent } from './pages/numerology/numerology.component';
import { MarriagematchComponent } from './pages/marriagematch/marriagematch.component';
import { LuckynamesComponent } from './pages/luckynames/luckynames.component';
import { MantrasComponent } from './pages/mantras/mantras.component';
import { HeaderComponent } from './tiles/header/header.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'numerology', component: NumerologyComponent },
  { path: 'marriagematch', component: MarriagematchComponent },
  { path: 'luckynames', component: LuckynamesComponent },
  { path: 'mantras', component: MantrasComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutusComponent,
    NumerologyComponent,
    MarriagematchComponent,
    LuckynamesComponent,
    MantrasComponent,
    HeaderComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
