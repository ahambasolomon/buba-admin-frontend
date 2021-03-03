import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FranchaiseService {

  constructor(private http: HttpClient, private _router: Router) { }
  getfranchaise(id:Number){
    return this.http.post<any>(`${environment.bubafranchaiseApi}/auth/franchaise/getfranchaisedata/${id}`, '');
  }

  editfranchaise(obj:any){
    return this.http.post<any>(`${environment.bubafranchaiseApi}/auth/franchaise/editfranchaise`, obj);
  }

  getpresentfranchaise(id:number) {
    return this.http.post<any>(`${environment.bubafranchaiseApi}/auth/franchaise/getpresentfranchaise/${id}`, '')
  }

  createfranchaise(obj:any){
    return this.http.post<any>(`${environment.bubafranchaiseApi}/auth/franchaise/register`, obj);
  }
}
