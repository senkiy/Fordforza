import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { CommonModule } from '@angular/common';
import { CarTableComponent } from "../../components/car-table/car-table.component";
import { DashboardService } from '../../services/dashboard.service';
import { Veiculo, VinInfos } from '../../models/car';
import { MenuComponent } from '../../components/menu/menu.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CarTableComponent, MenuComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit {
  DashboardService = inject(DashboardService);
  cdr = inject(ChangeDetectorRef)

  veiculos: Veiculo[] = [];

  veiculoSelecionado: Veiculo = {
    id: -1,
    connected: 0,
    volumetotal: 0,
    softwareUpdates: 0,
    vin: "",
    img: "",
    vehicle: ""
  };

  vinInfos: VinInfos = {
    id: -1,
    odometro: 0,
    nivelCombustivel: 0,
    status: "",
    lat: 0,
    long: 0
  }

  vinPronto = false;
  ngOnInit() {
    this.DashboardService.getVeiculos().subscribe({
      next: (veiculos) => {
        
        this.veiculos = Object.values(veiculos) as Veiculo[]
        this.veiculoSelecionado = veiculos[0]

        this.DashboardService.getVinInfos(this.veiculoSelecionado.vin).subscribe({
          next: (vinInfos) => {
            this.vinInfos = vinInfos
            this.vinPronto = true;
            this.cdr.detectChanges();
          }
        })
      }
    })
  }

  onChangeSelect(event: Event) {
    const id = Number((event.target as HTMLSelectElement).value);
    const veiculo = this.veiculos.find((veiculo) => veiculo.id === id)

    if (veiculo) {
      this.veiculoSelecionado = veiculo
    }

    this.DashboardService.getVinInfos(this.veiculoSelecionado.vin).subscribe({
          next: (vinInfos) => {
            this.vinInfos = vinInfos
            this.vinPronto = true;
            this.cdr.detectChanges();
          }
        })
  }

  onChangeVinInfos(vinInfos: VinInfos) {
    this.vinInfos = vinInfos
  }
}
