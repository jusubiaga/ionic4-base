import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '@app/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private authService: AuthService, private location: Location) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

  goBack(): void {
    this.location.back();
  }
  
}
