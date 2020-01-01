import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage.component';
import { RouterModule, Route } from '@angular/router';
import { MatCommonModule, MatFormFieldModule, MatInputModule, MatToolbarModule, MatButtonModule, MatAutocompleteModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Route[] = [
  { path: '', component: HomepageComponent }
];

@NgModule({
  declarations: [HomepageComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,

    MatCommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatAutocompleteModule,

    RouterModule.forChild(routes),
  ]
})
export class HomepageModule { }
