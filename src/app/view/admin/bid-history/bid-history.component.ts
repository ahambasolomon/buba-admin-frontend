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
  selector: 'app-bid-history',
  templateUrl: './bid-history.component.html',
  styleUrls: ['./bid-history.component.scss']
})
export class BidHistoryComponent implements OnInit {
  id : Number;
  page_size: Number = 10;
  start_date: string;
  end_date: string;
  search_text: string;
  firstlink: string;
  nextlink: string;
  previewlink: string;
  lastlink: string;
  to: number;
  total: number;
  bid_history: Array<any>;

  constructor(private activeRoute: ActivatedRoute, private agents:AgentsService, private toastr: ToastrService, private fb: FormBuilder, private auth: AuthService, private loadingBar: LoadingBarService, private router: Router) {
    this.activeRoute.params.subscribe(param => {
      this.id = param.id;
      // this.getAgent()
    })
  }
  search(){
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
    this.agents.bidhistory_paginate(url, this.id, this.page_size, this.start_date, this.end_date, this.search_text).subscribe(
      res => {
        this.loadingBar.complete();
        if (res.status == 'error') {
          this.toastr.error(res.message, 'Error occured');
          this.router.navigate(['/dashboard'])
        }
        // console.log(res)
        if (res.status == 'success') {
          // console.log(res.bid_history)
          this.firstlink = res.bid_history.first_page_url
          this.nextlink = res.bid_history.next_page_url
          this.previewlink = res.bid_history.prev_page_url
          this.lastlink = res.bid_history.last_page_url
          this.to = res.bid_history.to
          this.total = res.bid_history.total
          this.bid_history = res.bid_history.data
        }
      },
      err => {
        this.toastr.error('Error occured');
      }
    );
  }
  reload(){
    this.start_date;
    this.end_date;
    this.search_text;
    this.gethistory();
  }
  gethistory(){
    this.loadingBar.start();
    this.agents.bidhistory(this.id, this.page_size, this.start_date, this.end_date, this.search_text).subscribe(
      res => {
        this.loadingBar.complete();
        if (res.status == 'error') {
          this.toastr.error(res.message, 'Error occured');
          this.router.navigate(['/dashboard'])
        }
        // console.log(res)
        if (res.status == 'success') {
          // console.log(res.bid_history)
          this.firstlink = res.bid_history.first_page_url
          this.nextlink = res.bid_history.next_page_url
          this.previewlink = res.bid_history.prev_page_url
          this.lastlink = res.bid_history.last_page_url
          this.to = res.bid_history.to
          this.total = res.bid_history.total
          this.bid_history = res.bid_history.data
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
