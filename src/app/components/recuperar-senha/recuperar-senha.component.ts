import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, switchMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recuperar-senha',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css']
})
export class RecuperarSenhaComponent {
  @Output() fechar = new EventEmitter<void>();

  emailControl = new FormControl('', { nonNullable: true });
  emailValido: boolean | null = null;

  constructor() {
    this.emailControl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      filter(email => email.includes('@') && email.length > 5),
      switchMap(emailDigitado =>
        this.verificarEmail(emailDigitado).pipe(
          /*
          Substituição de `pluck('email')` por `map(res => res?.email)`
          O operador `pluck` foi evitado porque está marcado como obsoleto pela biblioteca oficial do RxJS.
          A recomendação é usar `map()` com optional chaining (ex: `map(x => x?.email)`) para garantir compatibilidade futura.
          Fonte: https://rxjs.dev/api/operators/pluck
           */
          map(res => res?.email === emailDigitado),
          tap(resultado => this.emailValido = resultado)
        )
      )
    ).subscribe();
  }

  verificarEmail(email: string) {
    const cadastrados = ['admin@email.com'];

    if (cadastrados.includes(email)) {
      return of({ email });
    } else {
      return of({ email: '' }); 
    }
  }

  fecharJanela() {
    this.fechar.emit();
  }
}
