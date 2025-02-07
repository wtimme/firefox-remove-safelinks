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

async function isSafeLinksSupposedToBeDisabledForURL(url) {
  const scopeAllSites = 'all-sites'
  const defaultScope = scopeAllSites

  let storedPreferences = await browser.storage.local.get({
    disableScope: defaultScope,
    urlPatterns: '',
  })
  let selectedScope = storedPreferences.disableScope
  let urlPatterns = storedPreferences.urlPatterns
    .split('\n')
    .filter(element => element.trim() !== '')

  if (selectedScope == scopeAllSites) {
    return true
  }

  let matchingPattern = urlPatterns.find(pattern => {
    try {
      let regularExpression = new RegExp(pattern)

      if (regularExpression.test(url)) {
        return true
      }
    } catch (error) {
      console.error(`Failed to evaluate "${pattern}": Not a valid regular expression.`)
    }

    return false
  })

  return typeof matchingPattern !== 'undefined'
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
