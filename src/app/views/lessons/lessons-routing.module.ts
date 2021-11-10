import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterNetworkTitleComponent } from './pages/master-network-title/master-network-title.component';
import { DigitalPropectionTitleComponent } from './pages/digital-propection-title/digital-propection-title.component';
import { OrganicTrafficTitleComponent } from './pages/organic-traffic-title/organic-traffic-title.component';
import { BondsTitleComponent } from './pages/bonds-title/bonds-title.component';
import { PayTrafficTitleComponent } from './pages/pay-traffic-title/pay-traffic-title.component';

const routes: Routes = [

  {
    path: '',
    children: [
      { path: 'digital-propection-title', component: DigitalPropectionTitleComponent },
      { path: 'organic-traffic-title', component: OrganicTrafficTitleComponent },
      { path: 'bonds-title', component: BondsTitleComponent },
      { path: 'master-network-title', component: MasterNetworkTitleComponent },
      { path: 'pay-traffic-title', component: PayTrafficTitleComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LessonsRoutingModule { }
