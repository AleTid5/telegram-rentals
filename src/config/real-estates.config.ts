import { urls } from "./urls.config";

export class RealEstateConfig {
  private readonly realEstateName;
  private readonly url;
  private readonly maxPrice: number = 50000;

  constructor(readonly realEstate: string) {
    this.realEstateName = realEstate;
    this.url = urls[realEstate];
  }

  generateURL = (city: string, start: number): string =>
    this.url
      .replace("{0}", city)
      .replace("{1}", this.maxPrice)
      .replace("{2}", start);

  getRealEstateName = (): string => this.realEstateName;
}

export const ARGENPROP = "ARGENPROP";
export const BUSCAINMUEBLE = "BUSCAINMUEBLE";
export const MERCADO_LIBRE = "MERCADO_LIBRE";
export const ZONAPROP = "ZONAPROP";
