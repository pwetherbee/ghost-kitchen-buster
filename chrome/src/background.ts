const DOMAIN = "http://localhost:3000";

// background.ts
export function setupOnInstalledListener(): void {
  chrome.runtime.onInstalled.addListener(() => {
    console.log("Ghost Kitchen Detector installed.");
  });
}

// This function should be called only once in the lifecycle of your background script.
setupOnInstalledListener();
// background.ts
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.restaurantNames) {
    const batchSize = 15;
    const restaurantNames = request.restaurantNames;

    // Function to process each batch
    async function processBatch(batch: string[]) {
      try {
        const response = await fetch(`${DOMAIN}/api/check`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ restaurants: batch }),
        });
        const data = await response.json();
        console.log("Received ghost kitchen data for batch:", data);

        // Send data back to the content script for each batch
        chrome.tabs.sendMessage(sender.tab?.id!, { ghostKitchenData: data });
      } catch (error) {
        console.error("Error fetching ghost kitchen data for a batch:", error);
        sendResponse({
          error: "Failed to fetch ghost kitchen data for a batch",
        });
      }
    }

    // Create batches and process them
    for (let i = 0; i < restaurantNames.length; i += batchSize) {
      const batch = restaurantNames.slice(i, i + batchSize);
      await processBatch(batch); // Wait for the current batch to be processed before moving to the next
    }

    sendResponse({ message: "All batches processed" });
    return true; // Indicates you wish to send a response asynchronously
  }
});
