import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { NumerologyComponent } from './pages/numerology/numerology.component';
import { MarriagematchComponent } from './pages/marriagematch/marriagematch.component';
import { LuckynamesComponent } from './pages/luckynames/luckynames.component';
import { MantrasComponent } from './pages/mantras/mantras.component';
import { HeaderComponent } from './tiles/header/header.component';
import { FooterComponent } from './tiles/footer/footer.component';

import { AmazingTimePickerModule } from 'amazing-time-picker';
import { SuccessComponent } from './pages/success/success.component';
import { FailureComponent } from './pages/failure/failure.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'numerology', component: NumerologyComponent },
  { path: 'marriagematch', component: MarriagematchComponent },
  { path: 'luckynames', component: LuckynamesComponent },
  { path: 'mantras', component: MantrasComponent },
  { path: 'success', component: SuccessComponent },
  { path: 'failure', component: FailureComponent }
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
    HeaderComponent,
    FooterComponent,
    SuccessComponent,
    FailureComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AmazingTimePickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
