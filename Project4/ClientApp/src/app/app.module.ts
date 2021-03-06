import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

import { LugarComponent } from './skjemaer/lugar/lugar.component';
import { PersonComponent } from './skjemaer/person/person.component';
import { BillettComponent } from './skjemaer/billett/billett.component';
import { RuteforekomstdatoComponent } from './skjemaer/ruteforekomstDato/ruteforekomstdato.component';
import { BetalingComponent } from './skjemaer/betaling/betaling.component';
import { RuteforekomstdatotidComponent } from './skjemaer/ruteForekomstDatoTid/ruteforekomstdatotid.component';
import { HavnComponent } from './skjemaer/Havn/havn.component';
import { Rute } from './Models-typescript/Rute';
import { RuteComponent } from './skjemaer/rute/rute.component';
import { BillettpersonComponent } from './skjemaer/billettPerson/billettperson.component';
import { ReservasjonComponent } from './skjemaer/reservasjon/reservasjon.component';
import { LoginComponent } from './skjemaer/login/login.component';
import { BrukerComponent } from './skjemaer/bruker/bruker.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { Modal } from '../modal/modal';
import { LogUtComponent } from './logUt/logUt.component';
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    LugarComponent,
    PersonComponent,
    RuteComponent,
    BillettComponent,
    RuteforekomstdatoComponent,
    RuteforekomstdatotidComponent,
    BillettpersonComponent,
    BetalingComponent,
    HavnComponent,
    LoginComponent,
    ReservasjonComponent,
    BrukerComponent,
    LogUtComponent,
    Modal
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: LugarComponent, pathMatch: 'full' },
      { path: 'lugar', component: LugarComponent, pathMatch: 'full' },
      { path: 'bruker', component: BrukerComponent, pathMatch: 'full' },
      { path: 'person', component: PersonComponent, pathMatch: 'full' },
      { path: 'billett', component: BillettComponent, pathMatch: 'full' },
      { path: 'havn', component: HavnComponent, pathMatch: 'full' },
      { path: 'rute', component: RuteComponent, pathMatch: 'full' },
      { path: 'billettperson', component: BillettpersonComponent, pathMatch: 'full' },
      { path: 'ruteforekomstdato', component: RuteforekomstdatoComponent, pathMatch: 'full' },
      { path: 'ruteforekomstdatotid', component: RuteforekomstdatotidComponent, pathMatch: 'full' },
      { path: 'reservering', component: ReservasjonComponent, pathMatch: 'full' },
      { path: 'betaling', component: BetalingComponent, pathMatch: 'full' },
      { path: 'logUt', component: LogUtComponent, pathMatch: 'full' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [Modal]
})
export class AppModule { }
