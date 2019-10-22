import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {RegisterService} from '../services/register.service';
import {MatSnackBar} from '@angular/material';

export interface ISelect {
    value: string;
    viewValue: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private http: RegisterService, private snackBar: MatSnackBar) { }

    password: string;
    confirmPassword: string;
    email: string;
    user: string;
    hide = true;
    hide1 = true;
    private sent: any;
    UserNew: FormGroup;
    used = false;
    match: boolean;

    genders: ISelect[] = [
        {value: 'Masculino', viewValue: 'Masculino'},
        {value: 'Femenino', viewValue: 'Femenino'},
    ];


    ngOnInit() {
        this.UserNew = this.formBuilder.group({
            Password: [this.password, [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(128),
            ]],
            ConfirmPassword: [this.confirmPassword, [
                Validators.required
            ]],
            Email: [this.email, [
                Validators.required,
                Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')
            ]],
            Name: new FormControl(),
            LastName: new FormControl(),
            Gender: new FormControl(),
            Birthday: new FormControl(),
            User: [this.user, [
                Validators.required,
                Validators.minLength(4)
            ]],
        });

        this.onChanges();
    }

    onSubmit() {
        this.used = false;
        const form = JSON.stringify(this.UserNew.value);
        this.match = this.passwordsMatch(this.UserNew);
        if (this.match) {
            this.http.post(form).subscribe(data => {
                if (data === 1) {
                    this.router.navigate(['/home']);
                    console.log('Home');
                    console.log(form);
                    sessionStorage.setItem('user', this.UserNew.controls.User.value);
                } else {
                    this.used = true;
                }
            });
        }
    }

    onChanges(): void {
        this.UserNew.valueChanges.subscribe(() => {
            this.used = false;
        });
    }

    private passwordsMatch = (formP: FormGroup): boolean => {
        if (formP.controls.Password.touched && formP.controls.ConfirmPassword.touched) {
            return formP.value.Password === formP.value.ConfirmPassword;
        }
        return true;
    }
}
