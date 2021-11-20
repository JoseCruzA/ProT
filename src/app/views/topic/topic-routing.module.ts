import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatingFacebookComponent } from './pages/creating-facebook/creating-facebook.component';
import { CreatingGmailComponent } from './pages/creating-gmail/creating-gmail.component';
import { CreatingImagesComponent } from './pages/creating-images/creating-images.component';
import { CreatingInstagramComponent } from './pages/creating-instagram/creating-instagram.component';
import { CreatingTextsComponent } from './pages/creating-texts/creating-texts.component';
import { IntroductionComponent } from './pages/introduction/introduction.component';
import { OptimizingFaceInstaComponent } from './pages/optimizing-face-insta/optimizing-face-insta.component';
import { SynchronizingWhatsappComponent } from './pages/synchronizing-whatsapp/synchronizing-whatsapp.component';
import { CreatingAccountFaceComponent } from './pages/creating-account-face/creating-account-face.component';
import { CreatingContentComponent } from './pages/creating-content/creating-content.component';
import { LinkFacebookGroupsComponent } from './pages/link-facebook-groups/link-facebook-groups.component';
import { SharingContentComponent } from './pages/sharing-content/sharing-content.component';
import { EffectivelyClosingPageComponent } from './pages/effectively-closing-page/effectively-closing-page.component';
import { CreatingFormComponent } from './pages/creating-form/creating-form.component';
import { TrackCampaignsComponent } from './pages/track-campaigns/track-campaigns.component';
import { KeywordResearchComponent } from './pages/keyword-research/keyword-research.component';
import { CreatingFacebookAdvertiserComponent } from './pages/creating-facebook-advertiser/creating-facebook-advertiser.component';
import { MarketAnalysisComponent } from './pages/market-analysis/market-analysis.component';
import { UsingAdvertiserAccountComponent } from './pages/using-advertiser-account/using-advertiser-account.component';
import { CampaignsPromoteBusinessComponent } from './pages/campaigns-promote-business/campaigns-promote-business.component';
import { CampaignListExcelComponent } from './pages/campaign-list-excel/campaign-list-excel.component';
import { CampaignSendDirectTrafficComponent } from './pages/campaign-send-direct-traffic/campaign-send-direct-traffic.component';
import { CampaignSendPeopleComponent } from './pages/campaign-send-people/campaign-send-people.component';
import { Bonus1ScriptPackComponent } from './pages/bonus1-script-pack/bonus1-script-pack.component';
import { Bonus2WhatsappMarketingComponent } from './pages/bonus2-whatsapp-marketing/bonus2-whatsapp-marketing.component';
import { Bonus3SellingPromotingComponent } from './pages/bonus3-selling-promoting/bonus3-selling-promoting.component';
import { BonusInstagramComponent } from './pages/bonus-instagram/bonus-instagram.component';
import { WhySocialMediaComponent } from './pages/why-social-media/why-social-media.component';
import { BuildSocialMediaComponent } from './pages/build-social-media/build-social-media.component';
import { GrowNetworkComponent } from './pages/grow-network/grow-network.component';
import { ConvertNetworkComponent } from './pages/convert-network/convert-network.component';
import { ConvertProspectsComponent } from './pages/convert-prospects/convert-prospects.component';
import { UseSocialMediaComponent } from './pages/use-social-media/use-social-media.component';
import { DuplicateSocialMediaComponent } from './pages/duplicate-social-media/duplicate-social-media.component';
import { Bonus1Component } from './pages/bonus1/bonus1.component';
import { Bonus2Component } from './pages/bonus2/bonus2.component';
const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'creating-facebook', component: CreatingFacebookComponent },
      { path: 'creating-gmail', component: CreatingGmailComponent },
      { path: 'creating-images', component: CreatingImagesComponent },
      { path: 'creating-instagram', component: CreatingInstagramComponent },
      { path: 'creating-texts', component: CreatingTextsComponent },
      { path: 'creating-account-face', component: CreatingAccountFaceComponent },
      { path: 'introduction', component: IntroductionComponent },
      { path: 'optimizing-face-insta', component: OptimizingFaceInstaComponent },
      { path: 'synchronizing-whatsapp', component: SynchronizingWhatsappComponent },
      { path: 'creating-content', component: CreatingContentComponent },
      { path: 'link-facebook-groups', component: LinkFacebookGroupsComponent },
      { path: 'sharing-content', component: SharingContentComponent },
      { path: 'effectively-closing-page', component: EffectivelyClosingPageComponent },
      { path: 'creating-form', component: CreatingFormComponent },
      { path: 'track-campaigns', component: TrackCampaignsComponent },
      { path: 'keyword-research', component: KeywordResearchComponent },
      { path: 'creating-facebook-advertiser', component: CreatingFacebookAdvertiserComponent },
      { path: 'market-analysis', component: MarketAnalysisComponent },
      { path: 'using-advertiser-account', component: UsingAdvertiserAccountComponent },
      { path: 'campaigns-promote-business', component: CampaignsPromoteBusinessComponent },
      { path: 'campaign-list-excel', component: CampaignListExcelComponent },
      { path: 'campaign-send-direct-traffic', component: CampaignSendDirectTrafficComponent },
      { path: 'campaign-send-people', component: CampaignSendPeopleComponent },
      { path: 'bonus1-script-pack', component: Bonus1ScriptPackComponent },
      { path: 'bonus2-whatsapp-marketing', component: Bonus2WhatsappMarketingComponent },
      { path: 'bonus3-selling-promoting', component: Bonus3SellingPromotingComponent },
      { path: 'bonus-instagram', component: BonusInstagramComponent },
      { path: 'why-social-media', component: WhySocialMediaComponent },
      { path: 'build-social-media', component: BuildSocialMediaComponent },
      { path: 'grow-network', component: GrowNetworkComponent },
      { path: 'convert-network', component: ConvertNetworkComponent },
      { path: 'convert-prospects', component: ConvertProspectsComponent },
      { path: 'use-social-media', component: UseSocialMediaComponent },
      { path: 'duplicate-social-media', component: DuplicateSocialMediaComponent },
      { path: 'bonus1', component: Bonus1Component },
      { path: 'bonus2', component: Bonus2Component },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopicRoutingModule { }
