import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { from } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { AgentsService } from 'src/app/core/services/agents.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-editagent',
  templateUrl: './editagent.component.html',
  styleUrls: ['./editagent.component.scss']
})
export class EditagentComponent implements OnInit {
  id:Number;
  hide = true;
  comfirmhide = true;
  Creating: boolean;
  agentype_selected: string;
  emailerror: Array<String>;
  phonerror: Array<string>;
  creatagent: FormGroup;
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
  agentObj: any;

  constructor(private activeRoute: ActivatedRoute, private agents:AgentsService, private toastr: ToastrService, private fb: FormBuilder, private auth: AuthService, private loadingBar: LoadingBarService, private router: Router) {
    this.activeRoute.params.subscribe(param => {
      // console.log(param.id)
      this.id = param.id;

      this.getAgent()
    })
   }

  ngOnInit(): void {

    this.formInit()
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
    // console.log(this.agentObj)
    this.creatagent = this.fb.group({
      firstname: [this.agentObj? this.agentObj.firstname: 'null', [Validators.required , Validators.minLength(4)]],
      lastname: [this.agentObj?.lastname, [Validators.required, Validators.minLength(4)]],
      email: [this.agentObj?.email, [Validators.email, Validators.required]],
      address: [this.agentObj?.address, [Validators.required , Validators.minLength(15)]],
      city: [this.agentObj?.city, [Validators.required, Validators.minLength(3)]],
      state: [this.agentObj?.state, [Validators.required, Validators.minLength(3)]],
      phone_number: [this.agentObj?.phone_number, [Validators.required, Validators.pattern("(0)[0-9]{10}")]],
      agent_type: [this.agentObj?.agent_type, [Validators.required]],
    });
  }
  get formControls() {
    return this.creatagent.controls;
  }
  cleanMail(){
    this.emailerror = []
  }
  cleanPhone(){
    this.phonerror = []
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
        Object.keys(this.agentObj).forEach(keys => {
          this.creatagent.patchValue({[keys] : this.agentObj[keys]})
        })
        // console.log(res.agent)
      },
      err => {
        console.log(err)
        this.toastr.error('An error has occured. Please try again later','Error');
        this.loadingBar.complete();
      }
    );
  }
  EditAgent(value){
    for (const i in this.creatagent.controls) {
      this.creatagent.controls[i].markAsDirty();
      this.creatagent.controls[i].updateValueAndValidity();
    }
    if (this.creatagent.invalid) {
      return;
    }
    const { firstname, lastname, email, address, state, city, phone_number } = value
    this.Creating = true;
    this.creatagent.disable();
    this.loadingBar.start();
    this.agents.editagent(firstname, lastname, email, address, state, city, phone_number, this.id).subscribe(
      res => {
        this.Creating = false;
        this.creatagent.enable();
        this.loadingBar.complete();
        if (res.status == 'error') {
          this.toastr.error(res.message,'Editing Error.');
        }
        if (res.status == 'success') {
          this.toastr.success(res.message,'successful');
          this.router.navigate(['/agent']);
        }
      },
      err => {
        this.Creating = false;
        this.creatagent.enable();
        this.loadingBar.complete();
        if (err.status == 422) {
          this.emailerror = err.error.errors.email;
          this.phonerror = err.error.errors.phone_number;
        }
      }
    );

  }


}
