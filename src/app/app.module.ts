import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './views/general/footer/footer.component';
import { HeaderComponent } from './views/general/header/header.component';
import { HomeComponent } from './views/home/home.component';
import { EventComponent } from './views/event/event.component';
import { LibraryComponent } from './views/library/library.component';
import { AboutComponent } from './views/about/about.component';
import { CalendarComponent } from './views/general/calendar/calendar.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { LoginComponent } from './views/modal/login/login.component';
import { RegisterComponent } from './views/modal/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './views/user/user.component';
import { ProfileComponent } from './views/user/profile/profile.component';
import { PromotionComponent } from './views/user/promotion/promotion.component';
import { CampaignComponent } from './views/user/campaign/campaign.component';
import { ReportsComponent } from './views/user/reports/reports.component';
import { OfficeGuard } from './guards/office.guard';
import { UsersComponent } from './views/user/users/users.component';
import { CreateOrUpdateComponent } from './views/user/users/create-or-update/create-or-update.component';
import { DeleteComponent } from './views/user/users/delete/delete.component';
import { LandingComponent } from './views/user/landing/landing.component';
import { WhatsappComponent } from './views/general/whatsapp/whatsapp.component';
import { CreateCampaignComponent } from './views/user/campaign/create-campaign/create-campaign.component';
import { DeleteCampaignComponent } from './views/user/campaign/delete-campaign/delete-campaign.component';
import { DataTablesModule } from 'angular-datatables';
import * as $ from 'jquery';


/**
 * Function that generate the translate loader and
 * say it where are the translation files
 *
 * @param http
 * @returns TranslateHttpLoader
 */
export function rootLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    EventComponent,
    LibraryComponent,
    AboutComponent,
    CalendarComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    ProfileComponent,
    PromotionComponent,
    CampaignComponent,
    ReportsComponent,
    UsersComponent,
    CreateOrUpdateComponent,
    DeleteComponent,
    LandingComponent,
    WhatsappComponent,
    CreateCampaignComponent,
    DeleteCampaignComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: rootLoaderFactory,
        deps: [HttpClient]
      }
    }),
    HttpClientModule,
    BrowserAnimationsModule,
    PdfViewerModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule
  ],
  providers: [
    Title,
    OfficeGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
