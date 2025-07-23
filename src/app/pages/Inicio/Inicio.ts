import { Component } from '@angular/core';
import { MenuComponent } from "../../components/menu/menu.component";
import { BoasVindasComponent } from "../../components/boas-vindas/boas-vindas.component";

@Component({
  selector: 'app-Inicio',
  imports: [MenuComponent, BoasVindasComponent],
  templateUrl: './Inicio.html',
  styleUrl: './Inicio.css'
})
export class InicioComponent {

}
