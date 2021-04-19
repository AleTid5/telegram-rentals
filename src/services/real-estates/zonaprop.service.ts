import { HttpService, Injectable } from "@nestjs/common";
import scrapeIt from "scrape-it";

import zonapropContract from "../../contracts/zonaprop.contract";
import { RealEstateServiceInterface } from "../../interfaces/real-estate.interface";

@Injectable()
export class ZonapropService implements RealEstateServiceInterface {
  private error: string = null;
  private readonly cities = ["san-isidro", "vicente-lopez"];

  async fetchData(): Promise<object[]> {
    console.log("Fetching Zonaprops...");

    await this.scrapSite(this.cities[0]);

    return new Promise((res) => res([{}]));
  }

  getError(): string {
    return this.error;
  }

  private baseURL = (city: string, price: number, page: number) =>
    `https://www.zonaprop.com.ar/departamentos-alquiler-${city}-desde-2-hasta-3-ambientes-menos-${price}-pesos.html`;

  private scrapSite = async (city, page = 1) => {
    const maxPrice: number = 50000;

    const { body } = await scrapeIt(this.baseURL(city, maxPrice, page), {
      data: zonapropContract,
    });
  };
}
