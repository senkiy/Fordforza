import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RecuperarSenhaComponent } from "../recuperar-senha/recuperar-senha.component";

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RecuperarSenhaComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})

export class LoginFormComponent {
  loginService = inject(LoginService)
  router = inject(Router)

  showPassword = false;
  isLoading = false;
  mostrarRecuperarSenha = false;

  loginForm = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    senha: new FormControl('', [Validators.required, Validators.minLength(3)]),
    rememberMe: new FormControl(false)
  });

constructor() {
  if (typeof window !== 'undefined' && localStorage) {
    const savedUser = localStorage.getItem('rememberedUser');
    if (savedUser) {
      this.loginForm.patchValue({
        nome: savedUser,
        rememberMe: true
      });
    }
  }
}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      this.markFormGroupTouched();
      return;
    }

    const { nome, senha, rememberMe } = this.loginForm.value;

    if (!nome || !senha) {
      this.showAlert("Existem campos a serem preenchidos!", 'warning');
      return;
    }

    this.isLoading = true;

    this.loginService.login(nome, senha).subscribe({
      error: (err) => {
        this.isLoading = false;
        
        if (err.status === 401) {
          this.showAlert("Usuário ou senha incorretos!", 'error');
          return;
        }
      
        this.showAlert("Erro interno. Tente novamente mais tarde!", 'error');
      },

      next: () => {
        this.isLoading = false;
        
        if (rememberMe) {
          localStorage.setItem('rememberedUser', nome);
        } else {
          localStorage.removeItem('rememberedUser');
        }

        sessionStorage.setItem('exibirToastBoasVindas', 'true');

        this.router.navigate(["/Inicio"]);
      }
    });
  }

  private markFormGroupTouched() {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  private showAlert(message: string, type: 'success' | 'error' | 'warning') {
  
    alert(message);
  }
}