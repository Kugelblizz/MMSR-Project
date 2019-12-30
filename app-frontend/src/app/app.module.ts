import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Route, RouterModule, PreloadAllModules } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

const routes: Route[] =   [{ path: '**', redirectTo: 'homepage', pathMatch: 'full' }];



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
