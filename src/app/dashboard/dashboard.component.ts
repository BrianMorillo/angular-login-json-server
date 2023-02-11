import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LOCALSTORAGE_LOGIN_ACCESS_TOKEN } from '../app.module';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(
    private router: Router
  ) { }

  /**
   * Logs current user out
   */
  logout() {
    localStorage.removeItem(LOCALSTORAGE_LOGIN_ACCESS_TOKEN);
    this.router.navigate(['../../']);
  }
}