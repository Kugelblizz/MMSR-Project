import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { ResultComponent } from './result.component';
import { RouterModule, Route } from '@angular/router';
import {
  MatCommonModule, MatFormFieldModule, MatInputModule, MatToolbarModule, MatButtonModule,
  MatAutocompleteModule, MatTableModule, MatIconModule, MatTooltipModule, MatSlideToggleModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import localeDeAt from '@angular/common/locales/de-AT';


const routes: Route[] = [
  { path: ':movieId', component: ResultComponent }
];

registerLocaleData(localeDeAt);


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
    MatSlideToggleModule,

    RouterModule.forChild(routes),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'de-at' }
  ]
})
export class ResultModule { }
