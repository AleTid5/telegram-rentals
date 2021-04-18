import { urls } from "./urls.config";

export class RealEstateConfig {
  private url = null;
  private readonly maxPrice: number = 50000;
  private readonly cities: string[] = ["san-isidro", "vicente-lopez"];

  constructor(readonly realEstate: string) {
    this.url = urls[realEstate];
  }

  getCities = () => this.cities;

  generateURL = (city: string, page: number): string =>
    this.url
      .replace("{0}", city)
      .replace("{1}", this.maxPrice)
      .replace("{2}", page);
}

export const ARGENPROP = "ARGENPROP";
export const MERCADO_LIBRE = "MERCADO_LIBRE";
export const ZONAPROP = "ZONAPROP";
