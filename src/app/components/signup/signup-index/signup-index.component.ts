import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { PasswordValidators } from 'src/app/services/password.validator';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
@Component({
  selector: 'app-signup-index',
  templateUrl: './signup-index.component.html',
  styleUrls: ['./signup-index.component.scss']
})
export class SignupIndexComponent implements OnInit, OnDestroy {
  returnUrl: string;
  paramsSubscription: Subscription;

  hidePassword: boolean = true;
  signUpBasicForm: FormGroup
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private auth: AuthService,
    private accountService: AccountService,
    private router: Router) { }

  ngOnInit(): void {
    this.signUpBasicForm = this.fb.group({
      // name: ['', [Validators.required, Validators.pattern(`^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$`)]],
      // name: ['', [Validators.required, Validators.pattern(/^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/g)]],
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      cPassword: ['', [Validators.required]],
      agreement: ['', [Validators.requiredTrue]]
    }, { validators: [PasswordValidators.comparePasswords('password', 'cPassword')] })
    this.returnUrl = this.route.snapshot.queryParams['continue'] || '/';
    this.paramsSubscription = this.route.queryParams.subscribe(q => {
      this.returnUrl = q['continue'];
    })
  }
  getError(control = 'email') {
    const { message } = this.signUpBasicForm.get(control).errors;
    if (message) return message;
  }
  setError(error: any, control = 'email') {
    this.signUpBasicForm.get(control).setErrors(error);
    this.signUpBasicForm.updateValueAndValidity()
  }

  async doSignup(form: any) {
    try {
      if (!this.signUpBasicForm.valid) return;
      const result = await this.auth.signup(form.email, form.password);
      if (!result) return;
      this.accountService.save(result.user.uid, {
        agreement: form.agreement,
        displayName: form.name,
        email: result.user.email,
        photoURL: '',
        roles: { admin: false, member: false }
      }).then(res => {
        this.router.navigateByUrl(this.returnUrl);
      }).catch(error => {
        this.setError(error)
      })
    } catch (e) { this.setError(e) }
  }

  navToLogin() {
    this.router.navigate(['/login'], { preserveQueryParams: true })
  }
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe()
  }
}
