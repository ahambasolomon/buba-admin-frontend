import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupComponent } from './group/group.component'
import { SingleComponent } from './single/single.component'


const routes: Routes = [
  {
    path: '',
    component: GroupComponent
  },
  {
    path: 'agent/:id',
    component: SingleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
