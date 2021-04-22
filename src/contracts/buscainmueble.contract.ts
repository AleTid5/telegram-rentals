import { BUSCAINMUEBLE } from "../config/real-estates.config";

const buscainmuebleContract = {
  listItem: ".listing__items > .listing__item",
  data: {
    id: {
      selector: "span.card__favourite",
      attr: "data-favourite",
    },
    realEstate: {
      convert: () => BUSCAINMUEBLE,
    },
    link: {
      selector: "a.card",
      attr: "href",
      convert: (uri) => `https://www.buscainmueble.com${uri}`,
    },
    price: {
      selector: "p.card__price",
      convert: (price) => parseInt(price.replace("$ ", "").replace(".", "")),
    },
  },
};

export default buscainmuebleContract;
