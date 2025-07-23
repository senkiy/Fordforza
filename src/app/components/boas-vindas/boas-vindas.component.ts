import { Component, OnInit } from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-boas-vindas',
  standalone: true,
  imports: [],
  templateUrl: './boas-vindas.component.html',
  styleUrl: './boas-vindas.component.css'
})
export class BoasVindasComponent implements OnInit {

  ngOnInit(): void {
    const exibir = sessionStorage.getItem('exibirToastBoasVindas');

    if (exibir === 'true') {
      const toastEl = document.getElementById('loginToast');
      if (toastEl) {
        const toast = new bootstrap.Toast(toastEl);
        toast.show();
      }

      sessionStorage.removeItem('exibirToastBoasVindas');
    }
  }

}
