import { Component, OnInit, Renderer2, ElementRef  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public loginForm!: FormGroup
  public errorMessage = ''

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  /**
   * Handles client login
   * @returns 
   */
  handleLogin() {
    if (!this.loginForm.valid) {
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: (v) => {
        this.router.navigate(['dashboard'])
      },
      error: (e) => {
        this.errorMessage = (e.error.message ? 
          e.error.message : 'Server Error: Please run the server...')
        this.showToast()
        setTimeout(() => this.hideToast(), 5000);
      }
    });

  }

  private showToast() {
    this.renderer.addClass(this.el.nativeElement.querySelector('#errorToast'), 'show');
  }

  private hideToast() {
    this.renderer.removeClass(this.el.nativeElement.querySelector('#errorToast'), 'show');
  }


}

