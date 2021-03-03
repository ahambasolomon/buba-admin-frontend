import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { CreateAgentComponent } from './create-agent/create-agent.component';
import { AgentlistComponent } from './agentlist/agentlist.component'
import { EditagentComponent } from './editagent/editagent.component'


const routes: Routes = [
  {
    path: '',
    // redirectTo: 'create'
    component: AgentlistComponent
  },
  {
    path: 'create',
    component: CreateAgentComponent
  },
  {
    path: ':id',
    component: EditagentComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentsRoutingModule { }
