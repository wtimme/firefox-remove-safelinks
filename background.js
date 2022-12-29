function removeSafelink(requestDetails) {
  if (requestDetails.url.includes('safelinks.protection.outlook.com/') ||
    requestDetails.url.includes('statics.teams.cdn.office.net/evergreen-assets/safelinks/1/atp-safelinks.html') ||
    requestDetails.url.includes('outlook.office.com/mail/safelink.html')) {
    var originalURL = getParameterByName('url', requestDetails.url);

    console.debug('Blocked a "Microsoft Safe Link" redirect.')

    return {
      redirectUrl: originalURL
    };
  }
}

browser.webRequest.onBeforeRequest.addListener(
  removeSafelink,
  { urls: ["<all_urls>"] },
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
