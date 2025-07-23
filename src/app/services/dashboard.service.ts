import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Veiculo, VinInfos } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
    http = inject(HttpClient)
    getVeiculos(): Observable<Veiculo[]> {
      return this.http.get<Veiculo[]>('https://apidavid-production.up.railway.app/vehicles')
    }

    getVinInfos(vin: string) {
      return this.http.get<VinInfos>('https://apidavid-production.up.railway.app/vehicleData')
   }
  }
