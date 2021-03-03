import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private http: HttpClient, private _router: Router) { }
  group_report(start_date:string, end_date:string, page_size: string){
    return this.http.post<any>(`${environment.bubafranchaiseApi}/sales/groupreport`, {
      page_size, start_date, end_date
    });
  }

  single_report(start_date:string, end_date:string, authid:string){
    return this.http.post<any>(`${environment.bubafranchaiseApi}/sales/sales_agent`, {
      authid, start_date, end_date
    });
  }
  dashboard(){
    return this.http.post<any>(`${environment.bubafranchaiseApi}/sales/dashboard`, '');
  }
}
