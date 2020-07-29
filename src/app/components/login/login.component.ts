import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hidePassword: boolean = true;
  loginForm: FormGroup
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group(
      {
        identifier: ['', [Validators.required]],
        password: ['', [Validators.required]]
      }
    )
  }

  async doLogin(form: any) {
    try {
      if (!this.loginForm.valid) return;
      const result = await this.auth.login(form.identifier, form.password)
      if (!result) return;
      const returnUrl = this.route.snapshot.queryParams['continue'] || '/';
      this.router.navigateByUrl(returnUrl);
    }
    catch (e) {
      this.setError(e);
    }
  }

  navToSignUp() {
    this.router.navigate(['/signup'], { preserveQueryParams: true })
  }
  navToForgotPassword() {
    this.router.navigate(['/account/reset'], { preserveQueryParams: true })
  }
  getError(control = 'identifier') {
    const { message } = this.loginForm.get(control).errors;
    if (message) return message;
  }
  setError(error: any, control = 'identifier') {
    this.loginForm.get(control).setErrors(error);
    this.loginForm.updateValueAndValidity()
  }

}