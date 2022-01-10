import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { User } from 'src/app/services/user';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private globalService: GlobalService, private router: Router) {
    this.globalService.currentUser.subscribe(user => {
      this.currentUser = user
    })
  }
  currentUser: User | null = null;
  ngOnInit(): void {
  }
  login(){
    this.router.navigateByUrl('/login')
  }
  logout(){
    this.globalService.isLogin = null;
    this.router.navigate(['/'])
  }
}
