import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LwxComponent } from './lwx/lwx.component';
import { TopComponent } from './top/top.component';

export const routes: Routes = [
    { path:'', component: HomeComponent },
    { path:'weather/LWX', component: LwxComponent },
    { path:'weather/TOP', component: TopComponent }
];
