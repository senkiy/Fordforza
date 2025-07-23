export interface Car {
  id: number;
  name: string;
  tagline: string;
  imageUrl: string;
  topSpeed: number;
  specs: {
    engine: string;
    power: string;
    acceleration: string;
  };
}