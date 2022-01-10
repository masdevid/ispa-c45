import { Component, OnInit } from '@angular/core';
export interface Menus {
  url: string;
  label: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  menus: Menus[] = [
    {
      url: 'dashboard',
      label: 'Dashboard'
    },
    {
      url: 'kategori-usia',
      label: 'Kategori Usia'
    },
    {
      url: 'training',
      label: 'Data Training'
    },
    {
      url: 'testing',
      label: 'Testing'
    },
    {
      url: 'users',
      label: 'Admin Pengguna'
    }
  ]
  ngOnInit(): void {
  }

}
