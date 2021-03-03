import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { AgentsService } from 'src/app/core/services/agents.service';
import  { PermissionsService } from 'src/app/core/services/permissions.service';
import { FranchaiseService } from 'src/app/core/services/franchaise.service'
import { ToastrService } from 'ngx-toastr';
import { from } from 'rxjs';

@Component({
  selector: 'app-agent-permissions',
  templateUrl: './agent-permissions.component.html',
  styleUrls: ['./agent-permissions.component.scss']
})
export class AgentPermissionsComponent implements OnInit {
  checked: boolean = true
  page_size: number = 10;
  id: number;
  firstlink: number;
  nextlink: number;
  previewlink: String;
  lastlink: String;
  to: number;
  from: number;
  total: number;
  Obj: any;
  search_text: string;
  franchaise: Array<any>;
  creatagent: FormGroup;
  emailerror: any;
  phonerror: any;
  hide = true;
  comfirmhide = true;
  Creating: boolean;
  create_permissions: any;
  view_agents_permissions: any;
  create_agents_permissions: any;
  edit_agents_permissions: any;
  activate: any;
  view_games: any;
  states: Array<any> = [
    {
        name: 'Abia'
    },
    {
        name: 'Adamawa'
    },
    {
        name: 'Akwa Ibom'
    },
    {
        name: 'Anambra'
    },
    {
        name: 'Bauchi'
    },
    {
        name: 'Bayelsa'
    },
    {
        name: 'Benue'
    },
    {
        name: 'Borno'
    },
    {
        name: 'Cross River'
    },
    {
        name: 'Delta'
    },
    {
        name: 'Ebonyi'
    },
    {
        name: 'Edo'
    },
    {
        name: 'Ekiti'
    },
    {
        name: 'Enugu'
    },
    {
        name: 'FCT'
    },
    {
        name: 'Gombe'
    },
    {
        name: 'Imo'
    },
    {
        name: 'Jigawa'
    },
    {
        name: 'Kaduna'
    },
    {
        name: 'Kano'
    },
    {
        name: 'Katsina'
    },
    {
        name: 'Kebbi'
    },
    {
        name: 'Kogi'
    },
    {
        name: 'Kwara'
    },
    {
        name: 'Lagos'
    },
    {
        name: 'Nassarawa'
    },
    {
        name: 'Niger'
    },
    {
        name: 'Ogun'
    },
    {
        name: 'Ondo'
    },
    {
        name: 'Osun'
    },
    {
        name: 'Oyo'
    },
    {
        name: 'Plateau'
    },
    {
        name: 'Rivers'
    },
    {
        name: 'Sokoto'
    },
    {
        name: 'Taraba'
    },
    {
        name: 'Yobe'
    },
    {
        name: 'Zamfara'
    }
];



  constructor(private activeRoute: ActivatedRoute, private agents:AgentsService, private toastr: ToastrService, private loadingBar: LoadingBarService, private router: Router,private fb: FormBuilder, private _franchaise : FranchaiseService, private permission: PermissionsService) {
    this.activeRoute.params.subscribe(param => {
      // console.log(param.id)
      this.id = param.id;

      // this.getAgent()
    })
   }

   cleanMail(){
    this.emailerror = []
  }
  cleanPhone(){
    this.phonerror = []
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.creatagent.controls.confirmpassword.updateValueAndValidity());
  }

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.creatagent.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  }

  createfrans(){
    // console.log(this.creatagent.value)
    for (const i in this.creatagent.controls) {
      this.creatagent.controls[i].markAsDirty();
      this.creatagent.controls[i].updateValueAndValidity();
    }
    if (this.creatagent.invalid) {
      return;
    }

    this.Creating = true;
    this.creatagent.disable();
    this.creatagent.value.permission = {
      'create_permissions': this.create_permissions,
      'view_agents_permissions': this.view_agents_permissions,
      'create_agents_permissions': this.create_agents_permissions,
      'edit_agents_permissions': this.edit_agents_permissions,
      'view_games': this.view_games,
      'activate': this.activate,
    }
    this.loadingBar.start();
    console.log(this.creatagent.value)
    this._franchaise.createfranchaise(this.creatagent.value).subscribe(
      res => {
        this.Creating = false;
        this.creatagent.enable();
        this.loadingBar.complete();
        console.log(res.status)
        if (res.status == 'error') {
          this.toastr.error(res.message,'Creation Error.');
        }
        if (res.status == 'success') {
          this.toastr.success(res.message,'Successful');
          let currentUrl = this.router.url;
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
              this.router.navigate([currentUrl]);
          });
          // this.router.navigate(['/permissions']);
        }
      },
      err => {
        this.Creating = false;
        this.creatagent.enable();
        this.loadingBar.complete();
        if (err.status == 422) {
          this.emailerror = err.error.errors.email;
        }
      }
    );
  }

  formInit() {
    this.creatagent = this.fb.group({
      firstname: [null, [Validators.required , Validators.minLength(4)]],
      lastname: [null, [Validators.required, Validators.minLength(4)]],
      email: [null, [Validators.email, Validators.required]],
      // address: [null, [Validators.required , Validators.minLength(15)]],
      country: [null, [Validators.required, Validators.minLength(3)]],
      state: [null, [Validators.required, Validators.minLength(3)]],
      city: [null, [Validators.required, Validators.minLength(3)]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      create_permissions: [null],
      view_agents_permissions: [null],
      edit_agents_permissions: [null],
      create_agents_permissions: [null],
      view_games: [null],
      view_sales: [null],
      activate: [null],
      password_confirmation: [null, this.confirmValidator]
      // password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  get formControls() {
    return this.creatagent.controls;
  }
   getdataurl(url) {
    if (url == null) {
      this.toastr.info('no data available.');
      return
    }
    this.loadingBar.start();
    this.permission.allfranchaisepagiantion(url, this.page_size, this.search_text).subscribe(
      res => {
        this.firstlink = res.franchaise.first_page_url
        this.nextlink = res.franchaise.next_page_url
        this.previewlink = res.franchaise.prev_page_url
        this.lastlink = res.franchaise.last_page_url
        this.to = res.franchaise.to
        this.from = res.franchaise.from
        this.total = res.franchaise.total
        this.franchaise = res.franchaise.data
        this.loadingBar.complete();
      },
      err => {
        this.loadingBar.complete();
        if (err.status == 422) {
          this.toastr.warning(err.error.errors.page_size[0], 'Input error.');
          return;
        }
      }
    );
   }
   reload(){
     this.getfrancasise();
   }
   getfrancasise() {
    this.loadingBar.start();
    this.permission.allFranchaise(this.page_size, this.search_text).subscribe(
      res => {
        this.firstlink = res.franchaise.first_page_url
        this.nextlink = res.franchaise.next_page_url
        this.previewlink = res.franchaise.prev_page_url
        this.lastlink = res.franchaise.last_page_url
        this.to = res.franchaise.to
        this.from = res.franchaise.from
        this.total = res.franchaise.total
        this.franchaise = res.franchaise.data
        this.loadingBar.complete();
      },
      err => {
        this.loadingBar.complete();
        if (err.status == 422) {
          this.toastr.warning(err.error.errors.page_size[0], 'Input error.');
          return;
        }
      }
    );
   }

  ngOnInit(): void {
    // this.Creating = true
    this.formInit()
    this.getfrancasise()
  }

}
