const SearchService = {
  filter(boreholes, text) {
    if (!text) {
      return boreholes;
    }

    const search = text.toLowerCase();

    return boreholes.filter((borehole) => borehole.metadata.id.toLowerCase().includes(search));
  },
};

window.SearchService = SearchService;
