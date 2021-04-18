import { Module } from "@nestjs/common";

import { AppController } from "../controllers/app.controller";
import { AppService } from "../services/app.service";
import { ScrapperModule } from "./scrapper.module";

@Module({
  imports: [ScrapperModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
