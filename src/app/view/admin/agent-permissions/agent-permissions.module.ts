import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentPermissionsRoutingModule } from './agent-permissions-routing.module';
import { AgentPermissionsComponent } from './agent-permissions.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TabViewModule } from 'primeng/tabview';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssignpermissionsComponent } from './assignpermissions/assignpermissions.component';


@NgModule({
  declarations: [AgentPermissionsComponent, AssignpermissionsComponent],
  imports: [
    CommonModule,
    AgentPermissionsRoutingModule,
    TabViewModule,
    FormsModule,
    ReactiveFormsModule,
    InputSwitchModule
  ]
})
export class AgentPermissionsModule { }
