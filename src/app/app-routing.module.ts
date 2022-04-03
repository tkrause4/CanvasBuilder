import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanvasComponent } from './canvas/canvas.component';
import { CustomLayoutsComponent } from './custom-layouts/custom-layouts.component';
import { TemplatesComponent } from './templates/templates.component';

const routes: Routes = [
  {path: '', component: CanvasComponent},
  {path: 'layouts', component: CustomLayoutsComponent},
  {path: 'templates', component: TemplatesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
