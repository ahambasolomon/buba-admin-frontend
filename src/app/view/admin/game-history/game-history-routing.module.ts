import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import  { GameHistoryComponent } from './game-history.component'



const routes: Routes = [
  {
    path: ':id',
    component: GameHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameHistoryRoutingModule { }
