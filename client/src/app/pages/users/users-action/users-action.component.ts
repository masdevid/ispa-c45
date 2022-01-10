import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { HelpersService } from 'src/app/services/helpers.service';
import { User } from 'src/app/services/user';
import { UserService } from 'src/app/services/user.service';
import { BaseActionComponent } from 'src/app/shared/base-action';

@Component({
  selector: 'app-users-action',
  templateUrl: './users-action.component.html',
  styleUrls: ['./users-action.component.scss']
})
export class UsersActionComponent extends BaseActionComponent<User> implements OnInit, OnDestroy {


  constructor(
    public router:         Router,
    public activatedRoute: ActivatedRoute,
    public helpers:        HelpersService,
    public service:        UserService,
    public fb:             FormBuilder,
    public sb: MatSnackBar
    ) {
      super(router, activatedRoute, helpers, service, fb, sb);
      this.dataSource   = this.activatedRoute.snapshot.data['currentData'];
      this.redirectTo   = '/users'
      this.subject      = 'username';
      this.createForm();
    }
    ngOnInit(): void {
      super.ngOnInit();
    }

    ngOnDestroy(): void {
      super.ngOnDestroy();
    }

    defaultForm() {
      return {
        username:     [null, [Validators.required, Validators.minLength(5)]],
        password:     [null, [Validators.required, Validators.minLength(5)]],
      }
    }
  }
