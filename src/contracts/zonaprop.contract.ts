import { ZONAPROP } from "../config/real-estates.config";

const zonapropContract = {
  listItem: ".list-card-container > .postingCardContent",
  data: {
    id: {
      selector: "div",
      attr: "data-posting-id",
    },
    realEstate: {
      convert: () => ZONAPROP,
    },
    link: {
      selector: "a.go-to-posting",
      attr: "href",
    },
  },
};

export default zonapropContract;
