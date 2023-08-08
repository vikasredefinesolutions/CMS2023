klevu.interactive(function () {
  var options = {
    url: {
      landing: 'https://petermillar.coporategear.com/search/result.html',
      protocol: 'https:',
      search: 'https://eucs3v2.ksearchnet.com/cs/v2/search', // your Klevu APIv2 Search URL + endpoint path
    },
    search: {
      minChars: 0,
      searchBoxSelector:
        'input[type=text][name=q],input[type=search][name=q],.kuSearchInput', // your search input selector
      apiKey: 'klevu-16520939623005871', // your Klevu JS API Key
    },
    analytics: {
      apiKey: 'klevu-16520939623005871', // your Klevu JS API Key
    },
  };
  klevu(options);
});
