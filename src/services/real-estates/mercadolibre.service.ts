import { HttpService, Injectable } from "@nestjs/common";

import { ApartmentInterface } from "../../interfaces/apartment.interface";
import { RealEstateServiceInterface } from "../../interfaces/real-estate.interface";
import {
  MERCADO_LIBRE,
  RealEstateConfig,
} from "../../config/real-estates.config";

const [SAN_ISIDRO, VICENTE_LOPEZ] = ["TUxBQ1NBTjg4ZmJk", "TUxBQ1ZJQ2E3MTQz"];

@Injectable()
export class MercadolibreService implements RealEstateServiceInterface {
  private readonly maxResults = 50;
  private readonly cities: string[] = [SAN_ISIDRO, VICENTE_LOPEZ];
  private readonly config = new RealEstateConfig(MERCADO_LIBRE);
  private error: string = null;
  private results: ApartmentInterface[] = [];

  constructor(private httpService: HttpService) {}

  async findApartments(): Promise<ApartmentInterface[]> {
    console.log("Fetching MercadoLibre...");

    await Promise.all(
      this.cities.map(
        (city) =>
          new Promise(async (res) => {
            res(await this.fetchAPI(city));
          }),
      ),
    );

    return new Promise((res) => res(this.results));
  }

  private fetchAPI = async (city, offset = 0): Promise<void> => {
    try {
      const getResults = async (): Promise<ApartmentInterface[]> =>
        new Promise((res) => {
          this.httpService
            .get(this.config.generateURL(city, offset))
            .subscribe(({ data: { results } }) => {
              res(
                results.map(({ id, permalink: link, price }) => ({
                  id,
                  realEstate: MERCADO_LIBRE,
                  link,
                  price,
                })),
              );
            });
        });

      const results: ApartmentInterface[] = await getResults();

      this.results.push(...results);

      if (results.length === this.maxResults) {
        await this.fetchAPI(city, offset + this.maxResults);
      }
    } catch (error) {
      this.error = error;
    }
  };

  getError(): string {
    return this.error;
  }

  getName(): string {
    return MERCADO_LIBRE;
  }
}
