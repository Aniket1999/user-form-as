import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  url = "https://user-form-b.glitch.me/";

  register(email, name, phone, dob) {
    return this.http.post(this.url + `register`, {
      email: email,
      name: name,
      phone: phone,
      dob: dob
    });
  }
}
