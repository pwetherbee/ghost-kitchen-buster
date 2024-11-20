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
  const cartData = extractCartData();
  console.log("Cart Summary:", cartData);

  return;

  const restaurantNames = extractRestaurantNames();
  console.log("Restaurant names:", restaurantNames);
  if (restaurantNames.length > 0) {
    chrome.runtime.sendMessage({ restaurantNames });
  }
}

function handleGetCartData() {
  const cartData = extractCartData();
  console.log("Cart Summary:", cartData);

  return cartData;
}

const observer = new MutationObserver((mutations, obs) => {
  // check if the current route is /checkout
  handleGetCartData();

  console.log(window.location.pathname);

  if (window.location.pathname.startsWith("/checkout")) {
    const cartData = extractCartData();

    if (cartData?.items?.length) {
      console.log("Cart Summary:", cartData);
      chrome.runtime.sendMessage({ cartData });
      obs.disconnect();
    }

    return;
  } else {
    console.log("Not on checkout page");
  }

  return;

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

// new function that get's the users cart summary data-testid="cart-summary-panel" then fetches items from the cart list beow it

function extractCartData() {
  // Get the cart summary panel
  const cartPanel = document.querySelector(
    '[data-testid="cart-summary-panel"]'
  );
  if (!cartPanel) return null;

  // Get total items from the header
  const headerText = cartPanel.querySelector(
    '[data-baseweb="typo-labelmedium"]'
  )?.textContent;
  const totalItems = headerText ? parseInt(headerText.match(/\d+/)[0]) : 0;

  // Get all items from the cart
  const cartItems = cartPanel.querySelectorAll("li");
  const items = Array.from(cartItems)
    .map((item) => {
      // Get the item link which contains most of the information
      const itemLink = item.querySelector("a");
      if (!itemLink) return null;

      // Extract item details
      const name = itemLink.querySelector(".bo.bp.dq.dr.eg")?.textContent || "";

      // Get price information using data-testid
      const priceElements = itemLink.querySelectorAll(
        '[data-testid="rich-text"]'
      );
      let currentPrice = "",
        originalPrice = "";

      if (priceElements.length > 0) {
        // First price element is usually the current price
        currentPrice = priceElements[0]?.textContent || "";
        // If there's a second price element, it's the original price
        originalPrice = priceElements[1]?.textContent || currentPrice;
      }

      // Get quantity - updated class selector to be more specific
      const quantity = parseInt(
        item.querySelector('div[class*="bo ez dq f0"][class*="gg"]')
          ?.textContent || "1"
      );

      // Get image URL
      const imageUrl = itemLink.querySelector("img")?.src || "";

      return {
        name,
        currentPrice,
        originalPrice,
        quantity,
        imageUrl,
        isOnSale: priceElements.length > 1,
        link: itemLink.href,
      };
    })
    .filter((item) => item !== null);

  // Calculate total price
  const totalPrice = items.reduce((sum, item) => {
    const price = parseFloat(item.currentPrice.replace("$", "")) || 0;
    return sum + price * item.quantity;
  }, 0);

  return {
    totalItems,
    items,
    totalUniqueItems: items.length,
    hasDiscountedItems: items.some((item) => item.isOnSale),
    totalPrice: `$${totalPrice.toFixed(2)}`,
  };
}

// Example usage:
