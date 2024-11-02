function removeSafelink(requestDetails) {
  var originalURL = getParameterByName('url', requestDetails.url);

  console.debug('Blocked a "Microsoft Safe Link" redirect.')

  return {
    redirectUrl: originalURL
  };
}

browser.permissions.getAll().then((p) => {
  browser.webRequest.onBeforeRequest.addListener(
    removeSafelink, {
      urls: p.origins
    },
    ['blocking']
  );
});

// Source: https://stackoverflow.com/a/901144
function getParameterByName(name, url) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
