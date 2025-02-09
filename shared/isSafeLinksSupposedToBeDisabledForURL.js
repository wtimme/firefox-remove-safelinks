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
