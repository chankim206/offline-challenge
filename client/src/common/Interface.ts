export interface Car {
  [key: string]: any;
  _id: string;
  make: string;
  year: number;
  color: string;
  price: number;
  hasSunroof: boolean;
  isFourWheelDrive: boolean;
  hasLowMiles: boolean;
  hasPowerWindows: boolean;
  hasNavigation: boolean;
  hasHeatedSeats: boolean;
  mileage: number;
}

export interface Filter {
  feature: string;
  name: string;
}
