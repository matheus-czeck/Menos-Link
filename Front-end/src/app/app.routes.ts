import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { RedirectComponent } from './page/redirect/redirect.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: ':codigo', component: HomeComponent },
  { path: '**', redirectTo: '' },
];
