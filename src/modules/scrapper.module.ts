import { HttpModule, Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";

import { ScrapperService } from "../services/scrapper.service";
import { ScrapperWorker } from "../workers/scrapper.worker";
import { RealEstateServiceInterface } from "../interfaces/real_estate.interface";
import realEstates from "../services/real_estates";

@Module({
  imports: [ScheduleModule.forRoot(), HttpModule],
  providers: [
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
