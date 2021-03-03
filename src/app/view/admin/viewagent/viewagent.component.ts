import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { AgentsService } from 'src/app/core/services/agents.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-viewagent',
  templateUrl: './viewagent.component.html',
  styleUrls: ['./viewagent.component.scss']
})
export class ViewagentComponent implements OnInit {

  // constructor() { }
  agentObj: any;
  id: number;


  constructor(private activeRoute: ActivatedRoute, private agents:AgentsService, private toastr: ToastrService, private fb: FormBuilder, private auth: AuthService, private loadingBar: LoadingBarService, private router: Router) {
    this.activeRoute.params.subscribe(param => {
      this.id = param.id;
      this.getAgent()
    })
  }
  // toggle(){
  //   this.loadingBar.start();
  //   this.agents.toggle_activation(this.agentObj.authid).subscribe(
  //     res => {
  //       this.loadingBar.complete();
  //       if (res.status == 'error') {
  //         // console.log(res)
  //         this.toastr.error(res.message, "Error occured");
  //         this.router.navigate(['/dashboard'])
  //       }
  //       this.agentObj = res.agent
  //     },
  //     err => {
  //       console.log(err)
  //       this.loadingBar.complete();
  //       this.toastr.error('An error has occured. Please try again later','Error');
  //       this.loadingBar.complete();
  //     }
  //   );
  // }

  toggle() {
    this.loadingBar.start();
    this.agents.toggle_activation(this.agentObj.authid).subscribe(
      res => {
        if (res.status == 'error') {
          this.toastr.error(res.message, "Error occured");
          this.router.navigate(['/dashboard'])
        }
        if (res.status == 'success'){
          this.toastr.success(res.message, "Successful");
          window.location.reload();
        }
        this.loadingBar.complete();
      },
      err => {
        this.loadingBar.complete();
        this.toastr.error('Network error.');
      }
    );
  }

  editit(){
    // ../viewagent/{{ user.id }}
    this.router.navigate([`../viewagent/{{agentObj.id}}`])
  }
  getAgent(){
    this.loadingBar.start();
    this.agents.geteachdata(this.id).subscribe(
      res => {
        this.loadingBar.complete();
        if (res.status == 'error') {
          // console.log(res)
          this.router.navigate(['/dashboard'])
        }
        this.agentObj = res.agent
      },
      err => {
        console.log(err)
        this.loadingBar.complete();
        this.toastr.error('An error has occured. Please try again later','Error');
        this.loadingBar.complete();
      }
    );
  }

  ngOnInit(): void {
    this.getAgent()
  }

}
