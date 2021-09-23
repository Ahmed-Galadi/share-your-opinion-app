import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmedValidator } from 'src/app/confirmation/confirm.validator';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm!: FormGroup;
  errorMessage: string = ''

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

// Initialize Forms
  initForm() {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      confirmPassword: ['',[Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      userName: ['', Validators.required],
      age: [0, Validators.required]
    }, {
      validator: ConfirmedValidator('password', 'confirmPassword')
    });
  }

// Creat New User
  onSubmit() {
    const email = this.signUpForm.get('email')?.value;
    const password = this.signUpForm.get('password')?.value;
    const userName = this.signUpForm.get('userName')?.value;
    const age = this.signUpForm.get('age')?.value;

    this.authService.creatUser(email, password, userName, age).then(
      () => {
        this.router.navigate(['/posts']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
}
