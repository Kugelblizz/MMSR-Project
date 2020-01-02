import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultComponent } from './result.component';
import { RouterModule, Route } from '@angular/router';
import {
  MatCommonModule, MatFormFieldModule, MatInputModule, MatToolbarModule, MatButtonModule,
  MatAutocompleteModule, 
  MatTableModule,
  MatIconModule,
  MatTooltipModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Route[] = [
  { path: ':movieId', component: ResultComponent }
];

@NgModule({
  declarations: [ResultComponent],
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
    MatTableModule,
    MatIconModule,
    MatTooltipModule,

    RouterModule.forChild(routes),
  ]
})
export class ResultModule { }
