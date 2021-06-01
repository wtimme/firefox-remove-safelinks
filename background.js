function removeSafelink(requestDetails) {
  if (requestDetails.url.includes('safelinks.protection.outlook.com/')) {
    var originalURL = getParameterByName('url', requestDetails.url);

    return {
      redirectUrl: originalURL
    };
  }
}

browser.webRequest.onBeforeRequest.addListener(
  removeSafelink,
  {urls: ["<all_urls>"]},
  ['blocking']
);

// Source: https://stackoverflow.com/a/901144
function getParameterByName(name, url) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';

    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
