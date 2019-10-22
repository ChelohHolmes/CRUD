import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    private incorrect: boolean;

  constructor(private formBuilder: FormBuilder, private router: Router, private http: LoginService) { }

    password: string;
    user: string;
    UserLogin: FormGroup;
    hide = true;

  ngOnInit() {
      this.UserLogin = this.formBuilder.group({
          Password: [this.password, [
              Validators.required,
              Validators.minLength(8),
              Validators.maxLength(128)
          ]],
          User: [this.user, [
              Validators.required,
          ]]
      });
  }

    onSubmit() {
        const form = JSON.stringify(this.UserLogin.value);
        console.log(form);
        this.http.post(form).subscribe(data => {
            if (data === 1) {
                this.router.navigate(['/home']);
                sessionStorage.setItem('user', this.UserLogin.controls.User.value);
            } else {
                this.incorrect = true;
            }
        });
    }

    onChanges(): void {
        this.UserLogin.valueChanges.subscribe(() => {
            this.incorrect = false;
        });
    }
}
