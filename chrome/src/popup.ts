// Ensure the element exists and is of correct type
const checkPageButton = document.getElementById("checkPage");

if (checkPageButton) {
  // Add event listener with explicit typing
  checkPageButton.addEventListener("click", async () => {
    try {
      const tabs = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      if (tabs.length > 0) {
        const tab = tabs[0];

        // Check if tab.id is available (it should always be for normal tabs)
        if (tab.id != null) {
          await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["dist/content-script.js"],
          });
        } else {
          console.error("Failed to retrieve tab id");
        }
      } else {
        console.error("No active tab found");
      }
    } catch (error) {
      console.error("Error executing script in tab", error);
    }
  });
} else {
  console.error("Button element not found");
}
