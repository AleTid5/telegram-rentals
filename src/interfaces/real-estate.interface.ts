import { ApartmentInterface } from "./apartment.interface";

export interface RealEstateServiceInterface {
  findApartments(): Promise<ApartmentInterface[]>;
  getError(): string;
  getName(): string;
}
