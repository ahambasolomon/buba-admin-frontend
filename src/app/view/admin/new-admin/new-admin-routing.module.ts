import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewAdminComponent } from './new-admin.component';


const routes: Routes = [
  {
    path: '',
    component: NewAdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewAdminRoutingModule { }
