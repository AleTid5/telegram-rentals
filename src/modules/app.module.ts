import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { AppController } from "../controllers/app.controller";
import { AppService } from "../services/app.service";
import { ScrapperModule } from "./scrapper.module";

@Module({
  imports: [MongooseModule.forRoot("mongodb://localhost/nest"), ScrapperModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
