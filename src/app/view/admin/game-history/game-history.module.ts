import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameHistoryRoutingModule } from './game-history-routing.module';
import { GameHistoryComponent } from './game-history.component';
import { SharedModule } from '../../shared/shared.module';
import {CalendarModule} from 'primeng/calendar';

@NgModule({
  declarations: [GameHistoryComponent],
  imports: [
    CommonModule,
    GameHistoryRoutingModule,
    SharedModule,
    CalendarModule,
  ]
})
export class GameHistoryModule { }
