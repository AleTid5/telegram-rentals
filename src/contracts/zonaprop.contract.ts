const zonapropContract = {
  listItem: ".list-card-container > .postingCardContent",
  data: {
    id: {
      selector: "div",
      attr: "data-posting-id",
    },
    link: {
      selector: "a.go-to-posting",
      attr: "href",
    },
  },
};

export default zonapropContract;
