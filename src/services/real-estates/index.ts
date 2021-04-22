import { Type } from "@nestjs/common";

import { ArgenpropService } from "./argenprop.service";
import { BuscainmuebleService } from "./buscainmueble.service";
import { MercadolibreService } from "./mercadolibre.service";

// Here is where all services has to been subscribed.
const realEstates: Type[] = [
  ArgenpropService,
  BuscainmuebleService,
  MercadolibreService,
];

export default realEstates;
