import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { from } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { AgentsService } from 'src/app/core/services/agents.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-game-history',
  templateUrl: './game-history.component.html',
  styleUrls: ['./game-history.component.scss']
})
export class GameHistoryComponent implements OnInit {
  id : Number;
  page_size: Number = 10;
  start_date: string;
  end_date: string;
  search_text: string;
  firstlink: string;
  nextlink: string;
  previewlink: string;
  lastlink: string;
  from: number;
  to: number;
  total: number;
  game_history: Array<any>;

  constructor(private activeRoute: ActivatedRoute, private agents:AgentsService, private toastr: ToastrService, private fb: FormBuilder, private auth: AuthService, private loadingBar: LoadingBarService, private router: Router) {
    this.activeRoute.params.subscribe(param => {
      this.id = param.id;
    })
  }

  changetime(value){
    console.log(value)
  }
  changepagesize(){
    this.gethistory();
  }
  search(){
    if (this.search_text == ' ' || this.search_text == null) {
      this.toastr.warning('ticket id required for search', 'search error occured');
      return;
    }
    this.gethistory();
  }
  reloadtime(){
    if (this.end_date == ' ' || this.end_date == null) {
      this.toastr.warning('end date is required', 'Select error occured');
      return;
    }
    if (this.start_date == ' ' || this.start_date == null) {
      this.toastr.warning('start date is required', 'Select error occured');
      return;
    }
    this.gethistory();
  }
  formatwinings(bidstatus:any, winstatus:any){
    if (bidstatus == 0) {
      return 'pending';
    }

    // if (winstatus > ) {

    // }

  }
  getdataurl(url:string){
    if (url == null) {
      this.toastr.error('no more records available', 'Error occured');
      return
    }

    this.loadingBar.start();
    this.agents.gamehistory_paginate(url, this.id, this.page_size, this.start_date, this.end_date, this.search_text).subscribe(
      res => {
        this.loadingBar.complete();
        if (res.status == 'error') {
          this.toastr.error(res.message, 'Error occured');
          this.router.navigate(['/dashboard'])
        }
        // console.log(res)
        if (res.status == 'success') {
          // console.log(res.game_history)
          this.firstlink = res.game_history.first_page_url
          this.nextlink = res.game_history.next_page_url
          this.previewlink = res.game_history.prev_page_url
          this.lastlink = res.game_history.last_page_url
          this.from = res.game_history.from
          this.to = res.game_history.to
          this.total = res.game_history.total
          this.game_history = res.game_history.data
        }
      },
      err => {
        console.log(err)
      }
    );
  }
  reload(){
    this.start_date = ' ';
    this.end_date = ' ';
    this.search_text = ' ';
    this.gethistory();
  }
  gethistory(){

    this.loadingBar.start();
    this.agents.gamehistory(this.id, this.page_size, this.start_date, this.end_date, this.search_text).subscribe(
      res => {
        this.loadingBar.complete();
        if (res.status == 'error') {
          this.toastr.error(res.message, 'Error occured');
          this.router.navigate(['/dashboard'])
        }
        if (res.status == 'success') {
          this.firstlink = res.game_history.first_page_url
          this.nextlink = res.game_history.next_page_url
          this.previewlink = res.game_history.prev_page_url
          this.lastlink = res.game_history.last_page_url
          this.to = res.game_history.to
          this.from = res.game_history.from
          this.total = res.game_history.total
          this.game_history = res.game_history.data
        }
      },
      err => {
        console.log(err)
      }
    );
  }


  ngOnInit(): void {
    this.gethistory()
  }

}
