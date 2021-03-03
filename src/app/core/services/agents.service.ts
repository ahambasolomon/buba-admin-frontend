import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgentsService {

  constructor(private http: HttpClient, private _router: Router) { }

  createAgent(agentdata:Object){
    return this.http.post<any>(`${environment.bubafranchaiseApi}/auth/agent/register` , agentdata);
  }

  toggle_activation(id: string){
    return this.http.post<any>(`${environment.bubafranchaiseApi}/auth/agent/toggle/activation`, {
      id
    });
  }

  listAgents(page_size: any, search_text: any){
    return this.http.post<any>(`${environment.bubafranchaiseApi}/auth/franchaise/getagents`, {page_size: page_size, search_text: search_text});
  }
  paginatlistAgents(page_size: any, search_text: any, url: string){
    return this.http.post<any>(url, {page_size: page_size, search_text: search_text});
  }

  geteachdata(id: Number){
    return this.http.get<any>(`${environment.bubafranchaiseApi}/auth/franchaise/agent/${id}`);
  }
  editagent(firstname: String, lastname : String, email: String, address: String, state: String, city: String, phone_number: string, id : Number){
    return this.http.post<any>(`${environment.bubafranchaiseApi}/auth/franchaise/editagent`, {
      firstname,
      lastname,
      email,
      address,
      state,
      city,
      phone_number,
      id
    });
  }

  bidhistory(id: Number, page_size: Number, start_date: string, end_date: string, search_text : string){
    return this.http.post<any>(`${environment.bubafranchaiseApi}/agent/bids/history`, {
      id, page_size, start_date, end_date, search_text
    });
  }

  bidhistory_paginate(url: string, id: Number, page_size: Number, start_date: string, end_date: string, search_text : string){
    return this.http.post<any>(url, {
      id, page_size, start_date, end_date, search_text
    });
  }

  gamehistory(id: Number, page_size: Number, start_date: string, end_date: string, search_text : string){
    return this.http.post<any>(`${environment.bubafranchaiseApi}/agent/games/history`, {
      id, page_size, start_date, end_date, search_text
    });
  }

  gamehistory_paginate(url: string, id: Number, page_size: Number, start_date: string, end_date: string, search_text : string){
    return this.http.post<any>(url, {
      id, page_size, start_date, end_date, search_text
    });
  }

}
