const argenpropContract = {
  listItem: ".listing__items > .listing__item",
  data: {
    id: {
      selector: "span.card__favourite",
      attr: "data-favourite",
    },
    link: {
      selector: "a.card",
      attr: "href",
      convert: (uri) => `https://www.argenprop.com/${uri}`,
    },
    price: {
      selector: "p.card__price",
      convert: (price) => parseInt(price.replace("$ ", "").replace(".", "")),
    },
  },
};

export default argenpropContract;
