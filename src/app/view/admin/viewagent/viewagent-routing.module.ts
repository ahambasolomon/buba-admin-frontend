import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewagentComponent } from './viewagent.component';

const routes: Routes = [
  {
    path: ':id',
    // redirectTo: 'create'
    component: ViewagentComponent
  },
];

// const routes: Routes = [
//   {
//     path: '',
//     // redirectTo: 'create'
//     component: AgentlistComponent
//   },
//   {
//     path: 'create',
//     component: CreateAgentComponent
//   },
//   {
//     path: ':id',
//     component: EditagentComponent
//   },

// ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewagentRoutingModule { }
