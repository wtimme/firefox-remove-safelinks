const allowedHostsTextArea = document.querySelector("#allowed-hosts");

// Store the currently selected settings using browser.storage.local.
function storeSettings() {
  let allowedHosts = allowedHostsTextArea.value
    .split("\n")
    .filter(line => line.trim().length > 0)
  
  browser.storage.local.set({
    allowedHosts
  }).then(() => {
    allowedHostsTextArea.value = allowedHosts.join("\n")
  });
}

// Update the options UI with the settings values retrieved from storage,
// or the default settings if the stored settings are empty.
function updateUI(restoredSettings) {
  if (typeof restoredSettings?.allowedHosts === 'undefined') {
    // No entries yet; the text area is empty
    return
  }

  allowedHostsTextArea.value = restoredSettings.allowedHosts.join("\n");
}

// On opening the options page, fetch stored settings and update the UI with them.
browser.storage.local.get().then(updateUI, console.error);

// Whenever the contents of the textarea changes, save the new values
allowedHostsTextArea.addEventListener("change", storeSettings);
