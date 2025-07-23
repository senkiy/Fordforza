import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() titulo: string = '';
  @Input() valor: number = 0;
  @Input() cor: 'primary' | 'success' | 'info' | 'warning' = 'primary'; 
}
