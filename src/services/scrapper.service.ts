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
    this.services.forEach(async (service: RealEstateServiceInterface) => {
      const apartments: ApartmentInterface[] = await service.findApartments();

      if (service.getError()) {
        return this.notifierServices.notifyError(
          service.getName(),
          service.getError(),
        );
      }

      const storedApartments = await this.apartmentService.findAll(
        service.getName(),
      );

      if (apartments.length === storedApartments.length) {
        return;
      }

      const newApartments: ApartmentInterface[] = await this.findNewApartments(
        storedApartments,
        apartments,
      );

      if (newApartments.length > 0) {
        this.apartmentService.save(newApartments);

        if (storedApartments.length > 0) {
          newApartments.forEach(this.notifierServices.notifyNewApartment);
        }
      }
    });
  }

  private findNewApartments = (
    storedApartments: ApartmentInterface[],
    apartments: ApartmentInterface[],
  ): ApartmentInterface[] => {
    const storedApartmentsIds = storedApartments.map(({ id }) => id);

    return apartments.filter(({ id }) => !storedApartmentsIds.includes(id));
  };
}
