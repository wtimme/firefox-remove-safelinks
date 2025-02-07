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
  }

  async function updateUI() {
    let storedPreferences = await browser.storage.local.get({
      disableScope: defaultScope,
      urlPatterns: '',
    })
    let selectedScope = storedPreferences.disableScope
    let urlPatterns = storedPreferences.urlPatterns

    // Show/hide the textarea
    let settings = document.querySelector('#disable-scope .addon-detail-settings')
    settings.style.setProperty('display', selectedScope == scopeSpecificSites ? 'block' : 'none')

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
  }

  await updateUI()
  setupRadioInputEventListeners()
  setupTextareaEventListener()
})();
