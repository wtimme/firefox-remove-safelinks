function patternsFromString(multilineString) {
  return multilineString
    .split('\n')
    .filter(element => element.trim() !== '')
}

function isURLMatchingPatterns(url, patterns, logErrors = true) {
  let matchingPattern = patterns.find(pattern => {
    try {
      let regularExpression = new RegExp(pattern)

      if (regularExpression.test(url)) {
        return true
      }
    } catch (error) {
      if (logErrors) {
        console.error(`Failed to evaluate "${pattern}": Not a valid regular expression.`)
      }
    }

    return false
  })

  return typeof matchingPattern !== 'undefined'
}

async function isSafeLinksSupposedToBeDisabledForURL(url) {
  const scopeAllSites = 'all-sites'
  const defaultScope = scopeAllSites

  let storedPreferences = await browser.storage.local.get({
    disableScope: defaultScope,
    urlPatterns: '',
  })
  let selectedScope = storedPreferences.disableScope
  let urlPatterns = patternsFromString(storedPreferences.urlPatterns)

  if (selectedScope == scopeAllSites) {
    return true
  }

  return isURLMatchingPatterns(url, urlPatterns)
}
