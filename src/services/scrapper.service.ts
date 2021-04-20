import { Inject, Injectable } from "@nestjs/common";

import { ApartmentInterface } from "../interfaces/apartment.interface";
import { RealEstateServiceInterface } from "../interfaces/real-estate.interface";
import { ApartmentService } from "./apartment.service";
import { NotifierService } from "./notifier.service";

@Injectable()
export class ScrapperService {
  constructor(
    @Inject("RealEstates") private services: RealEstateServiceInterface[],
    private apartmentService: ApartmentService,
    private notifierServices: NotifierService,
  ) {}

  start() {
    this.services.map(async (service) => {
      const apartments: ApartmentInterface[] = await service.findApartments();

      if (service.getError()) {
        return this.notifierServices.notifyError(
          service.getName(),
          service.getError(),
        );
      }

      const newApartments: ApartmentInterface[] = await this.findNewApartments(
        service.getName(),
        apartments,
      );

      console.log(newApartments);

      if (newApartments.length > 0) {
        this.apartmentService.save(newApartments);

        newApartments.forEach(this.notifierServices.notifyNewApartment);
      }
    });
  }

  private findNewApartments = async (
    realEstate: string,
    apartments: ApartmentInterface[],
  ): Promise<ApartmentInterface[]> => {
    const storedApartments = await this.apartmentService.findAll(realEstate);

    const storedApartmentsIds = storedApartments.map(({ id }) => id);

    return new Promise((res) =>
      res(apartments.filter(({ id }) => !storedApartmentsIds.includes(id))),
    );
    //return new Promise((res) => res(oldApartments));
  };
}
