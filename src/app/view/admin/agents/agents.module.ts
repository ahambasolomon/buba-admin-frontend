import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAgentComponent } from './create-agent/create-agent.component';
import { AgentsRoutingModule } from './agents-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AgentlistComponent } from './agentlist/agentlist.component';
import { EditagentComponent } from './editagent/editagent.component';


@NgModule({
  declarations: [CreateAgentComponent, AgentlistComponent, EditagentComponent],
  imports: [
    CommonModule,
    SharedModule,
    AgentsRoutingModule
  ]
})
export class AgentsModule { }
