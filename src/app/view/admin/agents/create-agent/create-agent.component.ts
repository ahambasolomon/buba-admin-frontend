import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { from } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { AgentsService } from 'src/app/core/services/agents.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-agent',
  templateUrl: './create-agent.component.html',
  styleUrls: ['./create-agent.component.scss']
})
export class CreateAgentComponent implements OnInit {
  hide = true;
  comfirmhide = true;
  Creating: boolean;
  agentype_selected: string;
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

  emailerror: Array<String>;
  phonerror: Array<string>;
  creatagent: FormGroup;

  constructor(private agents:AgentsService, private toastr: ToastrService, private fb: FormBuilder, private auth: AuthService, private loadingBar: LoadingBarService, private router: Router) { }

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
      firstname: [null, [Validators.required , Validators.minLength(4)]],
      lastname: [null, [Validators.required, Validators.minLength(4)]],
      email: [null, [Validators.email, Validators.required]],
      address: [null, [Validators.required , Validators.minLength(15)]],
      city: [null, [Validators.required, Validators.minLength(3)]],
      state: [null, [Validators.required, Validators.minLength(3)]],
      phone_number: [null, [Validators.required, Validators.pattern("(0)[0-9]{10}")]],
      agent_type: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      password_confirmation: [null, this.confirmValidator]
      // password: [null, [Validators.required, Validators.minLength(6)]]
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
  createAgent(){
    // alert(13245)
    console.log(this.creatagent.value)
    for (const i in this.creatagent.controls) {
      this.creatagent.controls[i].markAsDirty();
      this.creatagent.controls[i].updateValueAndValidity();
    }
    if (this.creatagent.invalid) {
      return;
    }

    this.Creating = true;
    this.creatagent.disable();
    this.loadingBar.start();
    this.agents.createAgent(this.creatagent.value).subscribe(
      res => {
        this.Creating = false;
        this.creatagent.enable();
        this.loadingBar.complete();
        console.log(res.status)
        if (res.status == 'error') {
          this.toastr.error(res.message,'Creation Error.');
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
  ngOnInit(): void {
    this.formInit()
  }

}
