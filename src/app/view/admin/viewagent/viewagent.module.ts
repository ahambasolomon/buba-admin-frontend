import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewagentRoutingModule } from './viewagent-routing.module';
import { ViewagentComponent } from './viewagent.component';
import { SharedModule } from '../../shared/shared.module';
import { InputSwitchModule } from 'primeng/inputswitch';

@NgModule({
  declarations: [ViewagentComponent],
  imports: [
    CommonModule,
    SharedModule,
    InputSwitchModule,
    ViewagentRoutingModule
  ]
})
export class ViewagentModule { }
