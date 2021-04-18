import { Injectable } from "@nestjs/common";
import scrapeIt from "scrape-it";

import { RealEstateInterface } from "../../interfaces/real_estate.interface";
import argenpropContract from "../../contracts/argenprop.contract";
import { ARGENPROP, RealEstateConfig } from "../../config/real_estates.config";

@Injectable()
export class ArgenpropService implements RealEstateInterface {
  private error: string = null;

  private maxResults = 20;
  private results = [];
  private config = new RealEstateConfig(ARGENPROP);

  async fetchData(): Promise<object[]> {
    console.log("Fetching Argenprop...");

    await Promise.all(
      this.config.getCities().map(
        (city) =>
          new Promise(async (res) => {
            res(await this.scrapSite(city));
          }),
      ),
    );

    return new Promise((res) => res(this.results));
  }

  getError(): string {
    return this.error;
  }

  private scrapSite = async (city, page = 1): Promise<void> => {
    try {
      const {
        data: { data: results },
      }: { data: { data: object[] } } = await scrapeIt(
        this.config.generateURL(city, page),
        {
          data: argenpropContract,
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
}
