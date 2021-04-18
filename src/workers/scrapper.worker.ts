import { Injectable } from "@nestjs/common";
import { Cron, CronExpression, Timeout } from "@nestjs/schedule";
import { ScrapperService } from "../services/scrapper.service";

@Injectable()
export class ScrapperWorker {
  constructor(private readonly scrapperService: ScrapperService) {}

  @Cron(CronExpression.EVERY_HOUR)
  runEveryHour() {
    try {
      this.scrapperService.start();
    } catch (e) {
      console.log(e);
    }
  }

  @Timeout(1000)
  runOnce() {
    try {
      this.scrapperService.start();
    } catch (e) {
      console.log(e);
    }
  }
}
