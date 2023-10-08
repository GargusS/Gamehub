// Function to load and display cart data
function loadAndDisplayCart() {
  // Get the container element for the cart
  const cartContainer = document.getElementById("cartContainer");

  // Retrieve the "gameData" key from local storage
  const gameDataString = localStorage.getItem("gameData");

  if (gameDataString) {
    // Parse the string back into an array of game objects
    const cartData = JSON.parse(gameDataString);

    // Clear the existing cart display
    cartContainer.innerHTML = "";

    // Iterate through each item in the cart
    cartData.forEach((gameData, index) => {
      // Create a div for the cart item
      const cartItemDiv = document.createElement("div");
      cartItemDiv.classList.add("cart-item");

      // Create an image element
      const imgElement = document.createElement("img");
      imgElement.src = gameData.image;
      imgElement.title = gameData.title;
      cartItemDiv.appendChild(imgElement);

      // Create a div for item details
      const detailsDiv = document.createElement("div");
      detailsDiv.classList.add("item-details");

      // Create elements for title and price
      const titleElement = document.createElement("h2");
      titleElement.textContent = gameData.title;
      detailsDiv.appendChild(titleElement);

      const priceElement = document.createElement("p");
      priceElement.textContent = `Price: $${gameData.price.toFixed(2)}`;
      detailsDiv.appendChild(priceElement);

      // Create buttons for increase, decrease, and remove
      const increaseButton = document.createElement("button");
      increaseButton.textContent = "+";
      increaseButton.addEventListener("click", () => increaseQuantity(index));
      detailsDiv.appendChild(increaseButton);

      const decreaseButton = document.createElement("button");
      decreaseButton.textContent = "-";
      decreaseButton.addEventListener("click", () => decreaseQuantity(index));
      detailsDiv.appendChild(decreaseButton);

      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", () => removeFromCart(index));
      detailsDiv.appendChild(removeButton);

      // Display the quantity
      const quantityElement = document.createElement("p");
      quantityElement.textContent = `Quantity: ${gameData.quantity}`;
      detailsDiv.appendChild(quantityElement);

      // Append item details to the cart item
      cartItemDiv.appendChild(detailsDiv);

      // Append the cart item to the cart container
      cartContainer.appendChild(cartItemDiv);
    });
  }
}

// Function to update and display the cart total
function updateCartTotal() {
  // Calculate the cart total
  const total = calculateCartTotal();

  // Display the cart total in your HTML
  const cartTotalElement = document.getElementById("cartTotal");
  cartTotalElement.textContent = `Total: $${total}`;
}

// Function to increase quantity
function increaseQuantity(index) {
  // Retrieve cart data from localStorage
  const gameDataString = localStorage.getItem("gameData");
  if (gameDataString) {
    const cartData = JSON.parse(gameDataString);
    if (cartData[index]) {
      cartData[index].quantity += 1;
      localStorage.setItem("gameData", JSON.stringify(cartData));
      loadAndDisplayCart(); // Refresh cart display
      updateCartTotal(); // Update cart total
    }
  }
}

// Function to decrease quantity
function decreaseQuantity(index) {
  // Retrieve cart data from localStorage
  const gameDataString = localStorage.getItem("gameData");
  if (gameDataString) {
    const cartData = JSON.parse(gameDataString);
    if (cartData[index] && cartData[index].quantity > 1) {
      cartData[index].quantity -= 1;
      localStorage.setItem("gameData", JSON.stringify(cartData));
      loadAndDisplayCart(); // Refresh cart display
      updateCartTotal(); // Update cart total
    }
  }
}

// Function to remove item from cart
function removeFromCart(index) {
  // Retrieve cart data from localStorage
  const gameDataString = localStorage.getItem("gameData");
  if (gameDataString) {
    const cartData = JSON.parse(gameDataString);
    if (cartData[index]) {
      cartData.splice(index, 1); // Remove the item
      localStorage.setItem("gameData", JSON.stringify(cartData));
      loadAndDisplayCart(); // Refresh cart display
      updateCartTotal(); // Update cart total
    }
  }
}

// Call the function to load and display cart data when the page loads
loadAndDisplayCart();

function calculateCartTotal() {
  // Retrieve the cart data from local storage
  const gameDataString = localStorage.getItem("gameData");
  if (gameDataString) {
    const cartData = JSON.parse(gameDataString);

    // Initialize the total to 0
    let total = 0;

    // Iterate through each item in the cart
    cartData.forEach((gameData) => {
      // Calculate the total price for the item (price * quantity)
      const itemTotal = gameData.price * gameData.quantity;

      // Add the item's total to the overall total
      total += itemTotal;
    });

    // Return the calculated total
    return total.toFixed(2); // Format total with 2 decimal places
  } else {
    // If no cart data exists, return a default total
    return "0.00";
  }
}

// Call the function to calculate the cart total and display it on page
const cartTotalElement = document.getElementById("cartTotal");
cartTotalElement.textContent = `Total: $${calculateCartTotal()}`;

function checkout() {
  // Display the "Thank you" message
  alert("Thank you, your order have been sent.");

  // Clear the localStorage
  localStorage.clear();

  // Redirect to index.html
  window.location.href = "../index.html";

  // Prevent the cart from submitting ( redirect to index.html instead )
  return false;
}
