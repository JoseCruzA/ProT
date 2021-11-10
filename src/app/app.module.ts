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
import { CreateEventComponent } from './views/event/create-event/create-event.component';
import { DeleteEventComponent } from './views/event/delete-event/delete-event.component';
import { TrainingComponent } from './views/training/training.component';
import { LessonsComponent } from './views/lessons/lessons.component';
import { TopicComponent } from './views/topic/topic.component';
import { MasterNetworkTitleComponent } from './views/lessons/pages/master-network-title/master-network-title.component';
import { DigitalPropectionTitleComponent } from './views/lessons/pages/digital-propection-title/digital-propection-title.component';
import { OrganicTrafficTitleComponent } from './views/lessons/pages/organic-traffic-title/organic-traffic-title.component';
import { BondsTitleComponent } from './views/lessons/pages/bonds-title/bonds-title.component';
import { PayTrafficTitleComponent } from './views/lessons/pages/pay-traffic-title/pay-traffic-title.component';
import { CreatingFacebookComponent } from './views/topic/pages/creating-facebook/creating-facebook.component';
import { CreatingGmailComponent } from './views/topic/pages/creating-gmail/creating-gmail.component';
import { CreatingImagesComponent } from './views/topic/pages/creating-images/creating-images.component';
import { CreatingInstagramComponent } from './views/topic/pages/creating-instagram/creating-instagram.component';
import { CreatingTextsComponent } from './views/topic/pages/creating-texts/creating-texts.component';
import { IntroductionComponent } from './views/topic/pages/introduction/introduction.component';
import { OptimizingFaceInstaComponent } from './views/topic/pages/optimizing-face-insta/optimizing-face-insta.component';
import { SynchronizingWhatsappComponent } from './views/topic/pages/synchronizing-whatsapp/synchronizing-whatsapp.component';
import { CreatingAccountFaceComponent } from './views/topic/pages/creating-account-face/creating-account-face.component';
import { CreatingContentComponent } from './views/topic/pages/creating-content/creating-content.component';
import { LinkFacebookGroupsComponent } from './views/topic/pages/link-facebook-groups/link-facebook-groups.component';
import { SharingContentComponent } from './views/topic/pages/sharing-content/sharing-content.component';
import { EffectivelyClosingPageComponent } from './views/topic/pages/effectively-closing-page/effectively-closing-page.component';
import { CreatingFormComponent } from './views/topic/pages/creating-form/creating-form.component';
import { TrackCampaignsComponent } from './views/topic/pages/track-campaigns/track-campaigns.component';
import { KeywordResearchComponent } from './views/topic/pages/keyword-research/keyword-research.component';
import { CreatingFacebookAdvertiserComponent } from './views/topic/pages/creating-facebook-advertiser/creating-facebook-advertiser.component';
import { MarketAnalysisComponent } from './views/topic/pages/market-analysis/market-analysis.component';
import { UsingAdvertiserAccountComponent } from './views/topic/pages/using-advertiser-account/using-advertiser-account.component';
import { CampaignsPromoteBusinessComponent } from './views/topic/pages/campaigns-promote-business/campaigns-promote-business.component';
import { CampaignListExcelComponent } from './views/topic/pages/campaign-list-excel/campaign-list-excel.component';
import { CampaignSendDirectTrafficComponent } from './views/topic/pages/campaign-send-direct-traffic/campaign-send-direct-traffic.component';
import { CampaignSendPeopleComponent } from './views/topic/pages/campaign-send-people/campaign-send-people.component';
import { Bonus1ScriptPackComponent } from './views/topic/pages/bonus1-script-pack/bonus1-script-pack.component';
import { Bonus2WhatsappMarketingComponent } from './views/topic/pages/bonus2-whatsapp-marketing/bonus2-whatsapp-marketing.component';
import { Bonus3SellingPromotingComponent } from './views/topic/pages/bonus3-selling-promoting/bonus3-selling-promoting.component';
import { BonusInstagramComponent } from './views/topic/pages/bonus-instagram/bonus-instagram.component';
import { WhySocialMediaComponent } from './views/topic/pages/why-social-media/why-social-media.component';
import { BuildSocialMediaComponent } from './views/topic/pages/build-social-media/build-social-media.component';
import { GrowNetworkComponent } from './views/topic/pages/grow-network/grow-network.component';
import { ConvertNetworkComponent } from './views/topic/pages/convert-network/convert-network.component';
import { ConvertProspectsComponent } from './views/topic/pages/convert-prospects/convert-prospects.component';
import { UseSocialMediaComponent } from './views/topic/pages/use-social-media/use-social-media.component';
import { DuplicateSocialMediaComponent } from './views/topic/pages/duplicate-social-media/duplicate-social-media.component';
import { Bonus1Component } from './views/topic/pages/bonus1/bonus1.component';
import { Bonus2Component } from './views/topic/pages/bonus2/bonus2.component';
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
    DeleteCampaignComponent,
    CreateEventComponent,
    DeleteEventComponent,
    TrainingComponent,
    LessonsComponent,
    TopicComponent,
    MasterNetworkTitleComponent,
    DigitalPropectionTitleComponent,
    OrganicTrafficTitleComponent,
    BondsTitleComponent,
    PayTrafficTitleComponent,
    CreatingFacebookComponent,
    CreatingGmailComponent,
    CreatingImagesComponent,
    CreatingInstagramComponent,
    CreatingTextsComponent,
    IntroductionComponent,
    OptimizingFaceInstaComponent,
    SynchronizingWhatsappComponent,
    CreatingAccountFaceComponent,
    CreatingContentComponent,
    LinkFacebookGroupsComponent,
    SharingContentComponent,
    EffectivelyClosingPageComponent,
    CreatingFormComponent,
    TrackCampaignsComponent,
    KeywordResearchComponent,
    CreatingFacebookAdvertiserComponent,
    MarketAnalysisComponent,
    UsingAdvertiserAccountComponent,
    CampaignsPromoteBusinessComponent,
    CampaignListExcelComponent,
    CampaignSendDirectTrafficComponent,
    CampaignSendPeopleComponent,
    Bonus1ScriptPackComponent,
    Bonus2WhatsappMarketingComponent,
    Bonus3SellingPromotingComponent,
    BonusInstagramComponent,
    WhySocialMediaComponent,
    BuildSocialMediaComponent,
    GrowNetworkComponent,
    ConvertNetworkComponent,
    ConvertProspectsComponent,
    UseSocialMediaComponent,
    DuplicateSocialMediaComponent,
    Bonus1Component,
    Bonus2Component
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
