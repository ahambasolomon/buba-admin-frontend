import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgentPermissionsComponent } from '../../admin/agent-permissions/agent-permissions.component'
import { AssignpermissionsComponent } from '../../admin/agent-permissions/assignpermissions/assignpermissions.component'

const routes: Routes = [
  {
    path: '',
    component: AgentPermissionsComponent
  },
  {
    path: ':id',
    component: AssignpermissionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentPermissionsRoutingModule { }
