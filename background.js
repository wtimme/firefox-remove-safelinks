// Initialize the list of allowed hosts
let allowedHosts = [];

// Get the stored list
browser.storage.local.get(data => {
  if (data.allowedHosts) {
    allowedHosts = data.allowedHosts;
  }
});

// Listen for changes in the allowed list
browser.storage.onChanged.addListener(changeData => {
  allowedHosts = changeData.allowedHosts.newValue;
});

function removeSafelink(requestDetails) {
  var originalURL = getParameterByName('url', requestDetails.url);

  console.debug('Blocked a "Microsoft Safe Link" redirect.')

  if (allowedHosts.length == 0 || allowedHosts[0] == "" || allowedHosts.find((element) => originalURL.startsWith(element))) {
    return {
      redirectUrl: originalURL
    };
  } else {
    return;
  }
}

browser.webRequest.onBeforeRequest.addListener(
  removeSafelink,
  {
    urls: [
      "https://statics.teams.cdn.office.net/evergreen-assets/safelinks/1/atp-safelinks.html*",
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
