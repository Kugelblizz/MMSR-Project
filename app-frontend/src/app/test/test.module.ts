import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test.component';
import { RouterModule, Route } from '@angular/router';

const routes: Route[] = [
  {path: '', component: TestComponent}
];

@NgModule({
  declarations: [TestComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class TestModule { }
