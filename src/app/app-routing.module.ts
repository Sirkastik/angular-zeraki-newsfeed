import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserFeedComponent } from './pages/user-feed/user-feed.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user-feed/:user', component: UserFeedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
