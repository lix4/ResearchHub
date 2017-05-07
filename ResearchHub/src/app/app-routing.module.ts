import { ResultsComponent } from './+results/results.component';
import { ProfileComponent } from './+profile/profile.component';
import { MainComponent } from './+main/main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookmarkComponent } from "./+bookmark/bookmark.component";
import { DetailsComponent } from "./+details/details.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    pathMatch: 'full'
    // canActivate: [AuthGuardService]
  },
  {
    path: 'details/:sourceid',
    component: DetailsComponent
  },
  {
    path: 'bookmark',
    component: BookmarkComponent
    // canActivate: [AuthGuardService]
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'results',
    component: ResultsComponent
    // canActivate: [AuthGuardService]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
