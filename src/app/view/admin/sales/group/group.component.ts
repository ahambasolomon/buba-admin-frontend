import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../../../core/services/sales.service'
import { Router } from '@angular/router';
import { ExcelService } from '../../../../core/services/excel.service'
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  page_size: any = 10;
  start_date: any;
  end_date: any;
  sort_game: boolean = false;
  sort_bid: boolean = false;
  totalbid_sales: any;
  totalgame_sales: any;
  sales_report: any;
  total: any;


  constructor(private sales:SalesService, private toastr: ToastrService, private loadingBar: LoadingBarService, private router: Router) { }
  loadata(){
    if (this.page_size == null || this.page_size == '') {
      this.toastr.warning("Page size is required!");
      return;
    }
    if (this.start_date == null || this.start_date == '') {
      this.toastr.warning("Start date is required!");
      return;
    }
    if (this.end_date == null || this.end_date == '') {
      this.toastr.warning("End date is required!");
      return;
    }
    this.loadingBar.complete();
    this.loadingBar.start();
    this.sales.group_report(this.start_date, this.end_date, this.page_size).subscribe(
      res => {
        this.loadingBar.complete()
        if (res.status == "error") {
          this.toastr.error(res.message, 'permission error');
          this.router.navigate(['/dashboard']);
          return;
        }
        if (res.status == "success") {
          this.sales_report = res.sales_report.report.sort(function (a:any, b:any) {
            return a.game_amount - b.game_amount;
          });
          console.log(res.sales_report)
          this.total = parseFloat(res.sales_report.total_sales);
          this.totalbid_sales = parseFloat(res.sales_report.total_bid_sales);
          this.totalgame_sales = parseFloat(res.sales_report.total_game_sales);
        }
      },
      err => {
        this.toastr.error('we have encounted a network error.', 'Network error');
      }
    );
  }

  sort_games(){
    if (this.sort_game == true) {
      this.sort_game = false;
      this.array_sort_games()
    } else {
      this.sort_game = true
      this.array_reverse_sort_games()
    }
  }

  sort_bids(){
    if (this.sort_bid == true) {
      this.sort_bid = false;
      this.array_sort_bids()
    } else {
      this.sort_bid = true
      this.array_reverse_sort_bids()
    }
  }

  array_sort_games(){
    this.sales_report.sort(function (a:any, b:any) {
      return parseFloat(a.game_amount) - parseFloat(b.game_amount);
    });
  }
  array_reverse_sort_games(){
    this.sales_report.sort(function (a:any, b:any) {
      return parseFloat(b.game_amount) - parseFloat(a.game_amount);
    });
  }
  array_sort_bids(){
    this.sales_report.sort(function (a:any, b:any) {
      return parseFloat(a.bid_amount) - parseFloat(b.bid_amount);
    });
  }
  array_reverse_sort_bids(){
    this.sales_report.sort(function (a:any, b:any) {
      return parseFloat(b.bid_amount) - parseFloat(a.bid_amount);
    });
  }

  ngOnInit(): void {
  }

}
