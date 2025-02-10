(async () => {
  const scopeAllSites = 'all-sites'
  const scopeSpecificSites = 'specific-sites'
  const defaultScope = scopeAllSites

  function setupRadioInputEventListeners() {
    let radioButtons = document.querySelectorAll('#disable-scope input[type="radio"]')
    radioButtons.forEach((input) => {
      input.addEventListener('change', (event) => {
        let selectedValue = event.target.value

        browser.storage.local.set({
          disableScope: selectedValue
        })

        updateUI()
      })
    })
  }

  function setupTextareaEventListener() {
    let textarea = document.querySelector('#disable-scope textarea')
    textarea.addEventListener('blur', (event) => {
      browser.storage.local.set({
        urlPatterns: event.target.value.trim()
      })
      updateUI()
    })
    textarea.addEventListener('keyup', updateVisibleMatchMessage)
    textarea.addEventListener('change', updateVisibleMatchMessage)
    textarea.addEventListener('paste', updateVisibleMatchMessage)
  }

  function setupTestRegularExpressionsInputEventListener() {
    let input = document.querySelector('#test-regular-expressions input')
    input.addEventListener('keyup', handleTestURLChanged)
    input.addEventListener('paste', handleTestURLChanged)
  }

  function handleTestURLChanged(event) {
    browser.storage.local.set({
      testURL: event.target.value.trim()
    })

    updateVisibleMatchMessage()
  }

  function updateVisibleMatchMessage() {
    let testURL = document.querySelector('#test-regular-expressions input').value.trim()
    let patterns = patternsFromString(document.querySelector('#disable-scope textarea').value)
    let match = isURLMatchingPatterns(testURL, patterns, false)

    let matchElement = document.querySelector('#regular-expressions-match')
    let noMatchElement = document.querySelector('#regular-expressions-no-match')

    if (testURL.length == 0) {
      matchElement.style.setProperty('display', 'none')
      noMatchElement.style.setProperty('display', 'none')
    } else {
      matchElement.style.setProperty('display', match ? 'block' : 'none')
      noMatchElement.style.setProperty('display', match ? 'none' : 'block')
    }
  }

  async function updateUI() {
    let storedPreferences = await browser.storage.local.get({
      disableScope: defaultScope,
      urlPatterns: '',
      testURL: '',
    })
    let selectedScope = storedPreferences.disableScope
    let urlPatterns = storedPreferences.urlPatterns

    // Show/hide the textarea
    let settings = document.querySelector('#disable-scope .addon-detail-settings')
    settings.style.setProperty('display', selectedScope == scopeSpecificSites ? 'block' : 'none')

    // Show/hide the "test regular expressions" section
    let testSection = document.querySelector('#test-regular-expressions')
    testSection.style.setProperty('display', selectedScope == scopeSpecificSites ? 'block' : 'none')

    // Restore the test URL
    let testURLInput = testSection.querySelector('input')
    testURLInput.value = storedPreferences.testURL

    // Select the radio input
    let radioInput = document.querySelector(`#disable-scope input[value="${selectedScope}"]`)
    radioInput.setAttribute('checked', 'checked')

    // Set the textarea's content
    let textarea = document.querySelector('#disable-scope textarea')
    textarea.value = storedPreferences.urlPatterns

    // Resize the textarea so that all URLs are visible
    let minimumNumberOfRows = 10
    let numberOfURLPatterns = urlPatterns.split('\n').length
    textarea.setAttribute('rows', Math.max(minimumNumberOfRows, numberOfURLPatterns))

    // Update the visibility of the 'match'/'no match' message
    updateVisibleMatchMessage()
  }

  await updateUI()
  setupRadioInputEventListeners()
  setupTextareaEventListener()
  setupTestRegularExpressionsInputEventListener()
})();
