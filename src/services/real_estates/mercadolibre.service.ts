import { Injectable } from "@nestjs/common";
import { RealEstateInterface } from "../../interfaces/real_estate.interface";

@Injectable()
export class MercadolibreService implements RealEstateInterface {
  error: string = null;

  async fetchData(): Promise<object[]> {
    console.log("Fetching MercadoLibre...");

    return new Promise((res) => res([{}]));
  }

  getError(): string {
    return this.error;
  }
}
