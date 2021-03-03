import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { LoadingBarService } from '@ngx-loading-bar/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { AgentsService } from 'src/app/core/services/agents.service';
import { FranchaiseService } from 'src/app/core/services/franchaise.service';
import  { PermissionsService } from 'src/app/core/services/permissions.service';
import { ToastrService } from 'ngx-toastr';
import { JsonpClientBackend } from '@angular/common/http';


@Component({
  selector: 'app-assignpermissions',
  templateUrl: './assignpermissions.component.html',
  styleUrls: ['./assignpermissions.component.scss']
})
export class AssignpermissionsComponent implements OnInit {
  assginpermissions: boolean;
  id : number;
  franchaisedata: any;
  permissions: any;
  create_permissions: Boolean;
  view_agents_permissions: Boolean;
  create_agents_permissions:Boolean;
  edit_agents_permissions: Boolean;
  view_game: Boolean;
  view_sales: Boolean;
  activate: Boolean;
  creatagent: FormGroup;
  emailerror: any;
  phonerror: any;
  hide = true;
  comfirmhide = true;
  Creating: boolean;
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


  constructor(private activeRoute: ActivatedRoute,private franchaise: FranchaiseService ,private agents:AgentsService, private toastr: ToastrService, private loadingBar: LoadingBarService, private router: Router, private fb: FormBuilder,private permission: PermissionsService) {
    this.activeRoute.params.subscribe(param => {
      // console.log(param.id)
      this.id = param.id;

      this.getfrancasise()
    })
  }
  getpresentfranchaise() {
    this.loadingBar.start();
    this.franchaise.getpresentfranchaise(this.id).subscribe(
      res => {
        this.franchaisedata = res.francahise;
        if (res.status == "error") {
          this.toastr.warning(res.message, ' Error.');
          this.loadingBar.complete();
          this.router.navigate(['/permissions']);
          return;
        }
        Object.keys(this.franchaisedata).forEach(keys => {
          this.creatagent.patchValue({[keys] : this.franchaisedata[keys]})
        })
        this.permissions = res.permissions;
        this.assignpermissions();
        this.loadingBar.complete();
        // let pdata = [{
        //   'create_permissions': this.create_permissions
        // }];

      },
      err => {
        this.loadingBar.complete();
      }
    );
  }
  getpermissions() {
    this.loadingBar.start();
    this.permission.getpermissions(this.id).subscribe(
      res => {
        // this.franchaise = res.franchaise.data
        console.log(res)
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
  cleanMail(){
    this.emailerror = []
  }
  cleanPhone(){
    this.phonerror = []
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
    let pdata = [{
        'create_permissions': this.create_permissions,
        'view_agents_permissions': this.view_agents_permissions,
        'edit_agents_permissions': this.edit_agents_permissions,
        'create_agents_permissions': this.create_agents_permissions,
        'view_games': this.view_game,
        'view_sales': this.view_sales,
        'agent_activation': this.activate
      }];
    this.creatagent.value.permissions = JSON.stringify(pdata);
    this.loadingBar.start();
    this.franchaise.editfranchaise(this.creatagent.value).subscribe(
      res => {
        this.Creating = false;
        this.creatagent.enable();
        this.loadingBar.complete();
        console.log(res.status)
        if (res.status == 'error') {
          this.toastr.error(res.message,'Saving Error.');
        }
        if (res.status == 'success') {
          this.toastr.success(res.message,'Successful');
          this.router.navigate(['/permissions']);
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
  formInit() {
    this.creatagent = this.fb.group({
      id: [this.franchaisedata?.id],
      firstname: [this.franchaisedata?.firstname, [Validators.required , Validators.minLength(4)]],
      lastname: [this.franchaisedata?.lastname, [Validators.required, Validators.minLength(4)]],
      email: [this.franchaisedata?.email, [Validators.email, Validators.required]],
      // address: [null, [Validators.required , Validators.minLength(15)]],
      country: [this.franchaisedata?.country, [Validators.required, Validators.minLength(3)]],
      state: [this.franchaisedata?.state, [Validators.required, Validators.minLength(3)]],
      city: [this.franchaisedata?.city, [Validators.required, Validators.minLength(3)]],
      // create_permissions: [this.checkforpermissions(this.permissions, "assign/permissions")], view_agents_permissions
    });
  }
  assignpermissions () {
    this.checkforassignpermissions(this.permissions, 'assign/permissions');
    this.checkforview_agents_permissions(this.permissions, 'view/agents');
    this.checkforedit_agents_permissions(this.permission, 'edit/agents');
    this.checkforcreate_agents_permissions(this.permission, 'create/agents');
    this.checkforviewgamespermissions(this.permission, 'view/games');
    this.checkforview_sales(this.permission, 'view/sales');
    this.checkforcreate_activate(this.permission, 'agent/activation');
  }
  // activate

  checkforcreate_agents_permissions(data: any, checker:any){
    let check = this.permissions.find(element => element.endpoint ==  checker);
    if (check != null) {
      this.create_agents_permissions = true;
      return
    }
    this.create_agents_permissions = false;
  }

  checkforcreate_activate(data: any, checker:any){
    let check = this.permissions.find(element => element.endpoint ==  checker);
    if (check != null) {
      this.activate = true;
      return
    }
    this.activate = false;
  }

  checkforview_sales(data: any, checker:any){
    let check = this.permissions.find(element => element.endpoint ==  checker);
    if (check != null) {
      this.view_sales = true;
      return
    }
    this.view_sales = false;
  }


  checkforview_agents_permissions(data: any, checker:any){
    let check = this.permissions.find(element => element.endpoint ==  checker);
    if (check != null) {
      this.view_agents_permissions = true;
      return
    }
    this.view_agents_permissions = false;
  }

  checkforedit_agents_permissions(data: any, checker:any){
    let check = this.permissions.find(element => element.endpoint ==  checker);
    if (check != null) {
      this.edit_agents_permissions = true;
      return
    }
    this.edit_agents_permissions = false;
  }

  checkforassignpermissions(data: any, checker:any){
    console.log(data)
    let check = this.permissions.find(element => element.endpoint ==  checker);

    if (check != null) {
      this.create_permissions = true;
      return
    }
    this.create_permissions = false;
    // console.log(this.create_permissions)
  }

  checkforviewgamespermissions(data: any, checker:any){
    console.log(data)
    let check = this.permissions.find(element => element.endpoint ==  checker);

    if (check != null) {
      this.view_game = true;
      return
    }
    this.view_game = false;
    // console.log(this.view_game)
  }

  // view/games
  get formControls() {
    return this.creatagent.controls;
  }
  getfrancasise() {
    this.loadingBar.start();
    this.franchaise.getfranchaise(this.id).subscribe(
      res => {
        // this.franchaise = res.franchaise.data
        // console.log(res)
        if (res.status == "error") {
          this.toastr.warning(res.message, ' Error occured.');
          this.router.navigate(['/dashboard'])
        }
        this.franchaisedata = res.franchaise;
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
    this.getpresentfranchaise()
    this.formInit()
  }

}
