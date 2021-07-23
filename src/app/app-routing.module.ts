import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './views/about/about.component';
import { EventComponent } from './views/event/event.component';
import { HomeComponent } from './views/home/home.component';
import { LibraryComponent } from './views/library/library.component';
import { UserComponent } from './views/user/user.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "events",
    component: EventComponent
  },
  {
    path: "about",
    component: AboutComponent
  },
  {
    path: "library",
    component: LibraryComponent
  },
  {
    path: "office",
    component: UserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
