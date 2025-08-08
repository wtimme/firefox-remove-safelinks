async function removeSafelink(requestDetails) {
  let safeLinkURL = requestDetails.url
  let originalURL = getParameterByName('url', safeLinkURL);
  let blockSafeLink = await isSafeLinksSupposedToBeDisabledForURL(originalURL)

  if (blockSafeLink) {
    console.debug('Blocked a "Microsoft Safe Link" redirect.')

    return {
      redirectUrl: originalURL
    };
  } else {
    console.debug('"Microsoft Safe Link" detected, but not blocked.')

    return {}
  }
}

browser.webRequest.onBeforeRequest.addListener(
  removeSafelink,
  {
    urls: [
      "https://statics.teams.cdn.office.net/evergreen-assets/safelinks/*/atp-safelinks.html*",
      "https://safelinks.protection.outlook.com/*",
      "https://*.safelinks.protection.outlook.com/*",
      "https://outlook.office.com/mail/safelink.html*",
      "https://*.safelinks.protection.office365.us/*",
    ]
  },
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
