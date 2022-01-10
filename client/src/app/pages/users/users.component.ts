import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { HelpersService } from 'src/app/services/helpers.service';
import { User } from 'src/app/services/user';
import { UserService } from 'src/app/services/user.service';
import { BasePage } from 'src/app/shared/base-page';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends BasePage<User> implements OnInit, AfterViewInit, OnDestroy {

  constructor(public service: UserService, public router: Router, public activatedRoute: ActivatedRoute, public sb: MatSnackBar, public dialog: MatDialog, public helpers: HelpersService) {
    super(service, router, activatedRoute, sb, dialog, helpers)
    this.title = 'Admin Pengguna'
    this.primaryKey       = 'id';
    this.sortActive       = 'username';
    this.sortDirection    = 'asc';
    this.subject          = 'username';
    const selectedFields  = 'username';
    this.displayedColumns = ['select', 'no', ...selectedFields.split(',').filter(f => f != 'id'), 'actions'];
  }

  ngOnInit(): void {
    super.ngOnInit()
  }
  ngOnDestroy(): void {
    super.ngOnDestroy()
  }
  ngAfterViewInit(): void {
    super.ngAfterViewInit()
  }
}
