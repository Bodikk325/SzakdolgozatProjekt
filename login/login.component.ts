import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isLoginVisible: boolean = true;
  loginEmail: string = '';
  loginPassword: string = '';
  registerEmail: string = '';
  registerPassword: string = '';
  confirmPassword: string = '';

  /**
   *
   */
  constructor(private router : Router) {
    
  }

  showLogin() {
    this.isLoginVisible = true;
  }

  showRegister() {
    this.isLoginVisible = false;
  }

  handleLogin() {
    if (localStorage.getItem(this.loginEmail) === this.loginPassword) {
      this.router.navigateByUrl("main")
    } else {
      alert('Hibás email vagy jelszó!');
    }
  }

  handleRegister() {
    if (this.registerPassword !== this.confirmPassword) {
      alert('A jelszavak nem egyeznek!');
      return;
    }
    localStorage.setItem(this.registerEmail, this.registerPassword);
    alert('Sikeres regisztráció! Most már bejelentkezhetsz.');
    this.showLogin();
  }
}
