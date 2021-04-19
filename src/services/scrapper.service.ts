import { Inject, Injectable } from "@nestjs/common";
import { RealEstateServiceInterface } from "../interfaces/real_estate.interface";

@Injectable()
export class ScrapperService {
  constructor(
    @Inject("RealEstates") private services: RealEstateServiceInterface[],
  ) {}

  start() {
    this.services.map(async (service) => {
      const data = await service.fetchData();

      console.log(data);

      return service.getError();
    });
  }
}
