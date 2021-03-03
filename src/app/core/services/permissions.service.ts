import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  constructor(private http: HttpClient, private _router: Router) { }

  allFranchaise(page_size: number, search_text: string){
    return this.http.post<any>(`${environment.bubafranchaiseApi}/permissions/franchaise/all`, {page_size, search_text});
  }

  getpermissions(id: number) {
    return this.http.post<any>(`${environment.bubafranchaiseApi}/permissions/franchaise/getpermmisons`, {'id': id})
  }

  allfranchaisepagiantion(url: string, page_size: number, search_text: string){
    return this.http.post<any>(url , {page_size, search_text});
  }
}
