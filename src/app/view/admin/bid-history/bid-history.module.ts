import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BidHistoryRoutingModule } from './bid-history-routing.module';
import { BidHistoryComponent } from './bid-history.component';
import { SharedModule } from '../../shared/shared.module';
import {CalendarModule} from 'primeng/calendar';



@NgModule({
  declarations: [BidHistoryComponent],
  imports: [
    CommonModule,
    SharedModule,
    CalendarModule,
    BidHistoryRoutingModule
  ]
})
export class BidHistoryModule { }
