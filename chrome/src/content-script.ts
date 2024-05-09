console.log("This script runs in the context of web pages.");

// content-script.js
// document.addEventListener("DOMContentLoaded", () => {
//   console.log("DOM loaded");
//   const restaurantNames = extractRestaurantNames();
//   console.log("Restaurant names:", restaurantNames);
//   if (restaurantNames.length > 0) {
//     chrome.runtime.sendMessage({ restaurantNames });
//   }
// });

function handleDOMLoaded() {
  const restaurantNames = extractRestaurantNames();
  console.log("Restaurant names:", restaurantNames);
  if (restaurantNames.length > 0) {
    chrome.runtime.sendMessage({ restaurantNames });
  }
}

const observer = new MutationObserver((mutations, obs) => {
  const restaurantLinks = document.querySelectorAll(
    'a[data-testid="store-card"]'
  );
  if (restaurantLinks.length > 0) {
    handleDOMLoaded();
    obs.disconnect(); // Stop observing after the first valid detection
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
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
    const restaurantName = link.querySelector("h3");

    const nextSib = link?.nextElementSibling;

    console.log(nextSib);
    console.log(nextSib?.children[1]);
    console.log(nextSib?.children[1].children[0].children[0]);
    console.log(nextSib?.children[1].children[0].children[0].children[1]);

    // grab the second child div of nextSib
    const titleDiv = nextSib?.children[1]; //.children[0]; //.children[0].children[1];

    const name = restaurantName?.textContent;

    if (!name) return;

    if (ghostKitchenData[name]) {
      // Add a ghost emoji or some other indicator next to the restaurant name
      //   const icon = document.createElement("img");
      //   icon.src = "path_to_ghost_icon.png"; // Ensure this is accessible
      // add ghost emoji to the restaurant name
      const icon = document.createElement("span");

      // style icon to be a chip with a background color and padding, with a ghost emoji and the text "Ghost Kitchen //GhostEmoji"

      icon.innerText = "Ghost Kitchen 👻";
      icon.style.backgroundColor = "yellow";
      icon.style.padding = "0.5rem";
      icon.style.borderRadius = "0.5rem";
      icon.style.color = "black";
      icon.style.fontWeight = "bold";
      icon.style.fontSize = "0.75rem";
      //   icon.style.marginLeft = "1rem";

      titleDiv?.appendChild(icon);
    }
  });
}
