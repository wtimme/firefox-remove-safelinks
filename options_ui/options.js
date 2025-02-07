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
    })
  }

  async function updateUI() {
    let storedPreferences = await browser.storage.local.get({
      disableScope: defaultScope,
      urlPatterns: '',
    })
    let selectedScope = storedPreferences.disableScope

    // Show/hide the textarea
    let settings = document.querySelector('#disable-scope .addon-detail-settings')
    settings.style.setProperty('display', selectedScope == scopeSpecificSites ? 'block' : 'none')

    // Select the radio input
    let radioInput = document.querySelector(`#disable-scope input[value="${selectedScope}"]`)
    radioInput.setAttribute('checked', 'checked')

    // Set the textarea's content
    let textarea = document.querySelector('#disable-scope textarea')
    textarea.value = storedPreferences.urlPatterns
  }

  await updateUI()
  setupRadioInputEventListeners()
  setupTextareaEventListener()
})();
