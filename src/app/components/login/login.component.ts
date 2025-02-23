import { Component, OnInit } from '@angular/core';
import { CallApiService } from '../services/call-api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilService } from '../services/util.service';
import { Router } from '@angular/router';
import { loginSubject } from '../services/constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private callApiService: CallApiService,
    private UtilService: UtilService,
    private router: Router
  ) {}
  loginForm!: FormGroup;
  passwordVisible = false;
  ngOnInit(): void {
    this.initForm();
  }

  /**
   * Initialize form
   */
  initForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  /**
   * On login request
   */
  onLoginRequest() {
    const { username, password } = this.loginForm.value;
    this.callApiService.loginUser(username, password).subscribe({
      next: (res: any) => {
        debugger;
        localStorage.setItem(
          'userData',
          JSON.stringify({
            token: res.token,
            username: username,
          })
        );
        this.router.navigate(['/home']);
        loginSubject.next(true);
      },
      error: (error) => {
        debugger;
        this.UtilService.openSnackBar(
          error?.body?.message || error?.body?.error
        );
      },
    });
  }
}
