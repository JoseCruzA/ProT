import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingGuard } from './guards/landing.guard';
import { OfficeGuard } from './guards/office.guard';
import { AboutComponent } from './views/about/about.component';
import { EventComponent } from './views/event/event.component';
import { HomeComponent } from './views/home/home.component';
import { LibraryComponent } from './views/library/library.component';
import { TrainingComponent } from './views/training/training.component';
import { LandingComponent } from './views/user/landing/landing.component';
import { UserComponent } from './views/user/user.component';
import { LessonsComponent } from './views/lessons/lessons.component';
import { TopicComponent } from './views/topic/topic.component';

const routes: Routes = [
  {
    path: "ref/:username/camp/:campaign",
    canActivate: [LandingGuard],
    component: HomeComponent
  },
  {
    path: "ref/:username",
    canActivate: [LandingGuard],
    component: HomeComponent
  },
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "events/ref/:username/camp/:campaign",
    canActivate: [LandingGuard],
    component: EventComponent
  },
  {
    path: "events/ref/:username",
    canActivate: [LandingGuard],
    component: EventComponent
  },
  {
    path: "events",
    component: EventComponent
  },
  {
    path: "about/ref/:username/camp/:campaign",
    canActivate: [LandingGuard],
    component: AboutComponent
  },
  {
    path: "about/ref/:username",
    canActivate: [LandingGuard],
    component: AboutComponent
  },
  {
    path: "about",
    component: AboutComponent
  },
  {
    path: "library/ref/:username/camp/:campaign",
    canActivate: [LandingGuard],
    component: LibraryComponent
  },
  {
    path: "library/ref/:username",
    canActivate: [LandingGuard],
    component: LibraryComponent
  },
  {
    path: "library",
    component: LibraryComponent
  },
  {
    path: "office/ref/:username/camp/:campaign",
    component: UserComponent,
    canActivate: [OfficeGuard, LandingGuard]
  },
  {
    path: "office/ref/:username",
    component: UserComponent,
    canActivate: [OfficeGuard, LandingGuard]
  },
  {
    path: "office",
    component: UserComponent,
    canActivate: [OfficeGuard]
  },
  {
    path: "landing/ref/:username/camp/:campaign",
    canActivate: [LandingGuard],
    component: LandingComponent
  },
  {
    path: "landing/ref/:username",
    canActivate: [LandingGuard],
    component: LandingComponent
  },
  {
    path: "landing",
    component: LandingComponent
  },
  {
    path: "training/ref/:username/camp/:campaign",
    canActivate: [LandingGuard],
    component: TrainingComponent
  },
  {
    path: "training/ref/:username",
    canActivate: [LandingGuard],
    component: TrainingComponent
  },
  {
    path: "training",
    component: TrainingComponent
  },
  {
    path: "lessons/ref/:username/camp/:campaign",
    canActivate: [LandingGuard, OfficeGuard],
    component: LessonsComponent
  },
  {
    path: "lessons/ref/:username",
    canActivate: [LandingGuard, OfficeGuard],
    component: LessonsComponent
  },
  {
    path: "lessons",
    loadChildren: () => import('./views/lessons/lessons.module').then(m => m.LessonsModule),
    canActivate: [OfficeGuard]
  },
  {
    path:"topic/ref/:username/camp/:campaign",
    canActivate: [LandingGuard, OfficeGuard],
    component: TopicComponent
  },
  {
    path:"topic/ref/:username",
    canActivate: [LandingGuard, OfficeGuard],
    component: TopicComponent
  },
  {
    path:"topic",
    loadChildren: () => import('./views/topic/topic.module').then(m => m.TopicModule),
    canActivate: [OfficeGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
