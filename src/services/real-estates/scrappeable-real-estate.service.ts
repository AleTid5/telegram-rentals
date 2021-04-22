import scrapeIt from "scrape-it";

import { ApartmentInterface } from "../../interfaces/apartment.interface";
import { RealEstateServiceInterface } from "../../interfaces/real-estate.interface";
import { RealEstateConfig } from "../../config/real-estates.config";

const [SAN_ISIDRO, VICENTE_LOPEZ] = ["san-isidro", "vicente-lopez"];

export abstract class ScrappeableRealEstateService
  implements RealEstateServiceInterface {
  private readonly cities: string[] = [SAN_ISIDRO, VICENTE_LOPEZ];
  private readonly config: RealEstateConfig;
  private readonly maxResults: number;
  private readonly contract: object;
  private error: string = null;
  private results: ApartmentInterface[] = [];

  protected constructor(
    readonly nameParam: string,
    readonly contractParam: object,
    readonly maxResultsParam: number,
  ) {
    this.contract = contractParam;
    this.maxResults = maxResultsParam;
    this.config = new RealEstateConfig(nameParam);
  }

  async findApartments(): Promise<ApartmentInterface[]> {
    console.log(`Fetching ${this.config.getRealEstateName()}...`);

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
          data: this.contract,
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
    return this.config.getRealEstateName();
  }
}
