import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { SalesRoutingModule } from './sales-routing.module';
import { GroupComponent } from './group/group.component';
import {CalendarModule} from 'primeng/calendar';
import { SingleComponent } from './single/single.component';


@NgModule({
  declarations: [GroupComponent, SingleComponent],
  imports: [
    CommonModule,
    CalendarModule,
    SharedModule,
    SalesRoutingModule
  ]
})
export class SalesModule { }
