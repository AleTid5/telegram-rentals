import { urls } from "./urls.config";

export class RealEstateConfig {
  private url = null;
  private readonly maxPrice: number = 50000;

  constructor(readonly realEstate: string) {
    this.url = urls[realEstate];
  }

  generateURL = (city: string, start: number): string =>
    this.url
      .replace("{0}", city)
      .replace("{1}", this.maxPrice)
      .replace("{2}", start);
}

export const ARGENPROP = "ARGENPROP";
export const MERCADO_LIBRE = "MERCADO_LIBRE";
export const ZONAPROP = "ZONAPROP";
