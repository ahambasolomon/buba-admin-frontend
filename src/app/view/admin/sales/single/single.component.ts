import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../../../core/services/sales.service'
import { Router , ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleComponent implements OnInit {
  id: any;
  page_size: any = 10;
  start_date: any;
  end_date: any;
  sales_report: any;
  games_reports: any;
  bids: any;
  agents: any;
  total: any;


  constructor(private sales:SalesService, private activeRoute: ActivatedRoute, private toastr: ToastrService, private loadingBar: LoadingBarService, private router: Router) {
    this.activeRoute.params.subscribe(param => {
      // console.log(param.id)
      this.id = param.id;

      // this.getAgent()
    })
  }
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
    this.sales.single_report(this.start_date, this.end_date, this.id).subscribe(
      res => {
        this.loadingBar.complete()
        if (res.status == "error") {
          this.toastr.error(res.message, 'permission error');
          this.router.navigate(['/dashboard']);
          return;
        }
        if (res.status == "success") {
          // console.log(res)
          this.games_reports = res.games_reports
          this.bids = res.bids
          this.agents = res.agent
        }
      },
      err => {
        this.toastr.error('we have encounted a network error.', 'Network error');
        return;
      }
    );
  }


  ngOnInit(): void {
  }

}
