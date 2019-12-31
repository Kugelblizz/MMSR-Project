import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'homepage',
    loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepageModule),
  },
  { path: 'test',
  loadChildren: () => import('./test/test.module').then(m => m.TestModule),
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
