import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage.component';
import { RouterModule, Route } from '@angular/router';
import { MatCommonModule, MatFormFieldModule, MatInputModule, MatToolbarModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

const routes: Route[] = [
  { path: '', component: HomepageComponent }
];

@NgModule({
  declarations: [HomepageComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,

    MatCommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,

    RouterModule.forChild(routes),
  ]
})
export class HomepageModule { }
