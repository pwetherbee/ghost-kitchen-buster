console.log("This script runs in the context of web pages.");

// content-script.js
document.addEventListener("DOMContentLoaded", () => {
  const restaurantNames = extractRestaurantNames();
  if (restaurantNames.length > 0) {
    chrome.runtime.sendMessage({ restaurantNames });
  }
});

function extractRestaurantNames() {
  const restaurantLinks = document.querySelectorAll(
    'a[data-testid="store-card"]'
  );
  return Array.from(restaurantLinks).map((link) => {
    const nameElement = link.querySelector("h3");
    return nameElement ? nameElement.textContent : "Unknown";
  });
}

// content-script.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.ghostKitchenData) {
    updatePageWithGhostKitchenInfo(message.ghostKitchenData);
  }
});

function updatePageWithGhostKitchenInfo(ghostKitchenData: {
  [restaurantName: string]: boolean;
}) {
  const restaurantLinks = document.querySelectorAll(
    'a[data-testid="store-card"]'
  );
  restaurantLinks.forEach((link) => {
    const restaurantName = link.querySelector("h3")?.textContent;

    if (!restaurantName) return;

    if (ghostKitchenData[restaurantName]) {
      // Add a ghost emoji or some other indicator next to the restaurant name
      const icon = document.createElement("img");
      icon.src = "path_to_ghost_icon.png"; // Ensure this is accessible
      link.appendChild(icon);
    }
  });
}
