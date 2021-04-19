import { Injectable } from "@nestjs/common";
import scrapeIt from "scrape-it";

import { ApartmentInterface } from "../../interfaces/apartment.interface";
import { RealEstateServiceInterface } from "../../interfaces/real-estate.interface";
import { RealEstateConfig, ZONAPROP } from "../../config/real-estates.config";
import zonapropContract from "../../contracts/zonaprop.contract";

const [SAN_ISIDRO, VICENTE_LOPEZ] = ["san-isidro", "vicente-lopez"];

@Injectable()
export class ZonapropService implements RealEstateServiceInterface {
  private readonly cities: string[] = [SAN_ISIDRO, VICENTE_LOPEZ];
  private readonly config = new RealEstateConfig(ZONAPROP);
  private readonly maxResults = 20;
  private error: string = null;
  private results: ApartmentInterface[] = [];

  async findApartments(): Promise<ApartmentInterface[]> {
    console.log("Fetching Zonaprop...");

    await Promise.all(
      this.cities.map(
        (city) =>
          new Promise(async (res) => {
            res(await this.scrapSite(city));
          }),
      ),
    );

    return new Promise((res) => res(this.results));
  }

  private scrapSite = async (city, page = 1): Promise<void> => {
    try {
      const {
        data: { data: results },
      }: { data: { data: ApartmentInterface[] } } = await scrapeIt(
        this.config.generateURL(city, page),
        {
          data: zonapropContract,
        },
      );

      this.results.push(...results);

      if (results.length === this.maxResults) {
        await this.scrapSite(city, page + 1);
      }
    } catch (error) {
      this.error = error;
    }
  };

  getError(): string {
    return this.error;
  }

  getName(): string {
    return ZONAPROP;
  }
}
