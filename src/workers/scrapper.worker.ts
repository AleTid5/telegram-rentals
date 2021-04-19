import { Injectable } from "@nestjs/common";
import { Cron, CronExpression, Timeout } from "@nestjs/schedule";
import { ScrapperService } from "../services/scrapper.service";

@Injectable()
export class ScrapperWorker {
  constructor(private readonly scrapperService: ScrapperService) {}

  @Cron(CronExpression.EVERY_HOUR)
  runEveryHour() {
    this.scrapperService.start();
  }

  @Timeout(1)
  runOnce() {
    this.scrapperService.start();
  }
}
