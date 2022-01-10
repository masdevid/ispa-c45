import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  get f(){
    return this.form.controls
  }
  constructor(private fb: FormBuilder, private router: Router, private userService: UserService, private globalService: GlobalService) {
    this.form = this.fb.group({
      username: [null, [Validators.required, Validators.minLength(5)]],
      password: [null, [Validators.required, Validators.minLength(5)]]
    })
  }
  form: FormGroup;
  errorMessage = '';

  ngOnInit(): void {
  }
  submit(){
    if (this.form.valid){
      this.userService.login(this.form.value).subscribe((user) => {
        this.errorMessage = ''
        this.globalService.isLogin = user;
        this.router.navigate(['/dashboard'])
      }, (err) => {
        this.errorMessage = err.error.message;
      })
    }
  }
}
