import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { SalesService } from 'src/app/core/services/sales.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  bidCharts: any;
  dashboard: any;
  userCharts: any;
  gameCharts: any;
  game_sales: any;
  bid_sales: any;

  constructor(private auth: AuthService, private sales: SalesService,private loadingBar: LoadingBarService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.fetchDashboard()
  }

  fetchDashboard() {
    this.loadingBar.start();
    this.sales.dashboard().subscribe((data: any) => {
      this.loadingBar.stop();
      console.log(data);
      if(data.status === 'success') {
        this.dashboard =  data;
        this.bid_sales = data.bid_sales;
        this.game_sales = data.game_sales;
        // this.bidCharts = data.bid_chart;
        // this.userCharts = data.users_chart;
        // this.gameCharts = data.game_chart;
      }
    }, (error: HttpErrorResponse) => {
      console.log(error);
      this.loadingBar.stop();
      if (error.status !== 401 && (error.status >= 400 && error.status <= 415)) {
        this.toastr.error(error.error.message, 'Error');
      } else if (error.status > 415) {
        this.toastr.error('An error has occured. Please try again later', 'Error');
      }
    })
  }
}
