import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Car } from './car.model'; // Importe a interface

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cars.html',
  styleUrl: './cars.css'
})
export class Cars {
  // Nosso array de carros
  allCars: Car[] = [
    {
      id: 1,
      name: 'Ford Mustang GT',
      tagline: 'O icônico muscle car que redefine performance e estilo.',
      imageUrl: '/assets/mustang-gt.jpg', // Lembre-se de adicionar as imagens!
      topSpeed: 290,
      specs: { engine: 'V8 5.0', power: '488cv / 589Nm', acceleration: '0-100 km/h em 4.3s' }
    },
    {
      id: 2,
      name: 'Ford Focus RS',
      tagline: 'Hot hatch definitivo com tração integral e tecnologia do WRC.',
      imageUrl: '/assets/Ford Focus RS.jpg',
      topSpeed: 240,
      specs: { engine: 'FordBoost 2.3 Turbo', power: '350cv / 470Nm', acceleration: '0-100 km/h em 4.7s' }
    },
    {
      id: 3,
      name: 'Ford GT',
      tagline: 'Supercarro de edição limitada com raízes nas vitórias em Le Mans.',
      imageUrl: '/assets/FordGT.jpg',
      topSpeed: 350,
      specs: { engine: 'EcoBoost V6 3.5 Biturbo', power: '647cv / 745Nm', acceleration: '0-100 km/h em 2.8s' }
    }
  ];

  filteredCars: Car[] = [];

  constructor() {
    this.filteredCars = this.allCars;
  }

  // 4. Crie a função de filtro
  filterCars(text: string) {
    if (!text) {
      this.filteredCars = this.allCars; // Se não houver texto, mostra todos
      return;
    }

    this.filteredCars = this.allCars.filter(
      car => car?.name.toLowerCase().includes(text.toLowerCase())
    );
  }
}