import { Injectable } from "@nestjs/common";

import { ARGENPROP } from "../../config/real-estates.config";
import argenpropContract from "../../contracts/argenprop.contract";
import { ScrappeableRealEstateService } from "./scrappeable-real-estate.service";

@Injectable()
export class ArgenpropService extends ScrappeableRealEstateService {
  constructor() {
    super(ARGENPROP, argenpropContract, 20);
  }
}
