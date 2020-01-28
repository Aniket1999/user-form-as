import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    var msg = "user created";
    let myItem = localStorage.getItem('message');
    if (msg != myItem) {
      this.router.navigate(['/user-form']);
    }
  }

  logout() {
    localStorage.removeItem("message");
    this.router.navigate(['/user-form']);
  }
}
