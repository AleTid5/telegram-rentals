import { HttpModule, Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";

import { RealEstateServiceInterface } from "../interfaces/real-estate.interface";
import realEstates from "../services/real-estates";
import { ScrapperService } from "../services/scrapper.service";
import { ScrapperWorker } from "../workers/scrapper.worker";
import { MongooseModule } from "@nestjs/mongoose";
import { Apartment, ApartmentSchema } from "../schemas/appartment.schema";
import { ApartmentService } from "../services/apartment.service";
import { NotifierService } from "../services/notifier.service";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    HttpModule,
    MongooseModule.forFeature([
      { name: Apartment.name, schema: ApartmentSchema },
    ]),
  ],
  providers: [
    ApartmentService,
    NotifierService,
    ScrapperService,
    ScrapperWorker,
    ...realEstates,
    {
      provide: "RealEstates",
      useFactory: (...realEstates: RealEstateServiceInterface[]) => realEstates,
      inject: realEstates,
    },
  ],
})
export class ScrapperModule {}
