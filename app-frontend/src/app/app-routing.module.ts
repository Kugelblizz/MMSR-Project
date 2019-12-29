import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageModule } from './homepage/homepage.module';
import { HomepageComponent } from './homepage/homepage.component';


const routes: Routes = [
  { path: 'homepage',
    loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepageModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
