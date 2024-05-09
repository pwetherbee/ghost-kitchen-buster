const DOMAIN = "http://localhost:3001";

// background.ts
export function setupOnInstalledListener(): void {
  chrome.runtime.onInstalled.addListener(() => {
    console.log("Ghost Kitchen Detector installed.");
  });
}

// This function should be called only once in the lifecycle of your background script.
setupOnInstalledListener();
// background.ts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.restaurantNames) {
    // Assuming your server endpoint is set up to receive POST requests at this route
    fetch(`${DOMAIN}/api/checkGhostKitchens`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ restaurants: request.restaurantNames }),
    })
      .then((response) => response.json())
      .then((data) => {
        // data should be an object with restaurant names as keys and boolean as values indicating ghost kitchen status
        console.log("Received ghost kitchen data:", data);

        // Send data back to the content script
        chrome.tabs.sendMessage(sender.tab?.id!, { ghostKitchenData: data });
      })
      .catch((error) => {
        console.error("Error fetching ghost kitchen data:", error);
        sendResponse({ error: "Failed to fetch ghost kitchen data" });
      });

    return true; // Indicates you wish to send a response asynchronously
  }
});
