klevu.interactive(function () {
  var options = {
    url: {
      landing: 'https://www.drivingi.com/search/result.html',
      protocol: 'https:',
      search: 'https://eucs3v2.ksearchnet.com/cs/v2/search', // your Klevu APIv2 Search URL + endpoint path
    },
    search: {
      minChars: 0,
      searchBoxSelector:
        'input[type=text][name=q],input[type=search][name=q],.kuSearchInput', // your search input selector
      apiKey: 'klevu-14903480948925715', // your Klevu JS API Key
    },
    analytics: {
      apiKey: 'klevu-14903480948925715', // your Klevu JS API Key
    },
  };
  klevu(options);
});
