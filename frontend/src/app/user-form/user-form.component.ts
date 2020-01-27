import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
declare var jQuery: any;

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {


  email = "";
  name = "";
  phone = "";
  dob = "";
  message = "";
  check = false;
  t_date;

  IsValidEmail(email) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(email) == false) {
      return false;
    }

    return true;
  }

  constructor(private userservice: UserService, private datePipe: DatePipe, private router: Router) { }

  ngOnInit() {

    var date = new Date();
    this.t_date = (this.datePipe.transform(date, "yyyy-MM-dd"));
    // console.log(Date.now() + " " + this.t_date.getTime());
  }

  agelimit(birthday) {
    var date = new Date(birthday);
    var ageDifMs = Date.now() - date.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }


  submitform() {
    this.check = true;
    if (!this.name || !this.email || !this.phone || !this.dob) {
      this.message = "Please fill all the details";
    }
    else
      if (!this.IsValidEmail(this.email)) {
        this.message = "Email format is not valid";
      }
      else
        if (this.phone.length > 10 && this.phone.length < 6) {
          this.message = "Phone number should be of format length >6 and <10";
        }
        else
          if (this.dob > this.t_date) {
            this.message = "Wrong DOB";
          }
          else
            if (this.agelimit(this.dob) < 18) {
              this.message = "Sorry, You are not allowed for registration.";
            }
            else {
              this.check = false;
              this.userservice.register(this.email, this.name, this.phone, this.dob).subscribe(res => {
                // alert(res);
                if (res['message'] == "user exists") {
                  alert("This email is already registered");
                  this.router.navigate(['/user-form']);

                }
                else {
                  this.router.navigate(['/dashboard']);
                }
              });
            }

  }
}