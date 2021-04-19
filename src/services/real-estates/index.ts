import { Type } from "@nestjs/common";

import { MercadolibreService } from "./mercadolibre.service";
import { ZonapropService } from "./zonaprop.service";
import { ArgenpropService } from "./argenprop.service";

// Here is where all services has to been subscribed.
const realEstates: Type[] = [
  ArgenpropService,
  MercadolibreService,
  //ZonapropService,
];

export default realEstates;
