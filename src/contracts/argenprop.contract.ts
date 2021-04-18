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
    },
  },
};

export default argenpropContract;
