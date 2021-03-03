import { Component, OnInit } from '@angular/core';
import { AgentsService } from 'src/app/core/services/agents.service'
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-agentlist',
  templateUrl: './agentlist.component.html',
  styleUrls: ['./agentlist.component.scss']
})
export class AgentlistComponent implements OnInit {
  page_size: any = 10;
  search_text: any;
  agents_data: Array<any>;
  firstlink: any
  nextlink: any
  previewlink: any
  lastlink: any
  to: any = 0
  total: any = 0
  from: any = 0

  search(){
    this.load_agents()
  }
  constructor(private agents:AgentsService, private toastr: ToastrService, private loadingBar: LoadingBarService, private router: Router) { }

  load_agents(){
    this.loadingBar.start();
    this.agents.listAgents(this.page_size , this.search_text).subscribe(
      res => {
        this.firstlink = res.agent.first_page_url
        this.nextlink = res.agent.next_page_url
        this.previewlink = res.agent.prev_page_url
        this.lastlink = res.agent.last_page_url
        this.to = res.agent.to
        this.from = res.agent.from
        this.total = res.agent.total
        this.agents_data = res.agent.data
        this.loadingBar.complete();
      },
      err => {
        this.toastr.error('An error has occured. Please try again later','Error');
        this.loadingBar.complete();
      }
    );
  }
  getdataurl(value: any) {

    if (value == null) {
      this.toastr.info('no data available.');
      return
    }

    this.loadingBar.start();
    this.agents.paginatlistAgents(this.page_size, this.search_text,value).subscribe(
      res => {
        this.firstlink = res.agent.first_page_url
        this.nextlink = res.agent.next_page_url
        this.previewlink = res.agent.prev_page_url
        this.lastlink = res.agent.last_page_url
        this.to = res.agent.to
        this.from = res.agent.from
        this.total = res.agent.total
        this.agents_data = res.agent.data
        this.loadingBar.complete();
      },
      err => {
        this.toastr.error('An error has occured. Please try again later','Error');
        this.loadingBar.complete();
      }
    )

  }
  ngOnInit(): void {
    this.load_agents()
  }

}
