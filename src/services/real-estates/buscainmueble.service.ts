import { Injectable } from "@nestjs/common";

import { BUSCAINMUEBLE } from "../../config/real-estates.config";
import buscainmuebleContract from "../../contracts/buscainmueble.contract";
import { ScrappeableRealEstateService } from "./scrappeable-real-estate.service";

@Injectable()
export class BuscainmuebleService extends ScrappeableRealEstateService {
  constructor() {
    super(BUSCAINMUEBLE, buscainmuebleContract, 20);
  }
}
