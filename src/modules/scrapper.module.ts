import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";

import { ScrapperService } from "../services/scrapper.service";
import { ScrapperWorker } from "../workers/scrapper.worker";
import { RealEstateInterface } from "../interfaces/real_estate.interface";
import realEstates from "../services/real_estates";

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [
    ScrapperService,
    ScrapperWorker,
    ...realEstates,
    {
      provide: "RealEstates",
      useFactory: (...realEstates: RealEstateInterface[]) => realEstates,
      inject: realEstates,
    },
  ],
})
export class ScrapperModule {}
