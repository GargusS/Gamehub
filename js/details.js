const loader = document.querySelector(".loader");

const gameInfo = document.getElementById("details");

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

const url = "https://cms.sonnesyn.no/wp-json/wc/store/products/" + id;


fetchDetails();

async function fetchDetails() {
  try {
    const response = await fetch(url);
    const info = await response.json();
    console.log(info.images[0].src);
    function createHtml(info) {
      gameInfo.innerHTML = `
      <div class="details" data-id="${info.id}">
      <button class="card-button"><a class="card-link" href="../html/buy.html">Back To Games</a></button>
      
      <h1>${info.name}</h1>
      <h2>$ ${info.prices.price/100}</h2>
      <img class="detail-img" src="${info.images[0].src}" 
      alt="A picture of ${info.name}">
      <h2 class="detail-description">${info.description}</h2>
      <button class="card-button" id="setItem">Add to Cart</button>
      </div>
      </div>`;
      
      document.title = `${info.name}`;

      function handleButtonClick() {
        // Get the game data that is to be added to the cart
        const gameData = info;

        // Retrieve the current game data from localStorage
        const gameDataString = localStorage.getItem("gameData");

        // Initialize gameDataArray as an empty array if it doesn't exist or is not an array
        let gameDataArray = [];
        if (gameDataString) {
          try {
            // Try to parse the existing data as an array
            gameDataArray = JSON.parse(gameDataString);
            if (!Array.isArray(gameDataArray)) {
              // If it's not an array, initialize it as an empty array
              gameDataArray = [];
            }
          } catch (error) {
            // If parsing fails, initialize it as an empty array
            gameDataArray = [];
          }
        }

        // Check if the game with the same id already exists in the cart
        const existingGame = gameDataArray.find(
          (item) => item.id === gameData.id
        );

        if (existingGame) {
          // If the game already exists, increase its quantity
          existingGame.quantity += 1;
        } else {
          // If the game doesn't exist, initialize the quantity to 1 and add it to the cart
          gameData.quantity = 1;
          gameDataArray.push(gameData);
        }

        // Update the game data in localStorage
        localStorage.setItem("gameData", JSON.stringify(gameDataArray));

        // Alert the user that the game has been added to the cart
        alert("Game have been added to your cart.");
      }

      // Get the button element by its ID
      const saveButton = document.getElementById("setItem");

      // Add a click event listener to the button
      saveButton.addEventListener("click", handleButtonClick);
    }

    // Select all images inside the fetchContainer
    const imagesToLoad = details.querySelectorAll("img");

    // Count the number of images to load
    let imagesLoaded = 0;
    const totalImages = imagesToLoad.length;

    // Add a load event listener to each image
    imagesToLoad.forEach((img) => {
      img.addEventListener("load", () => {
        imagesLoaded++;

        // Check if all images are loaded
        if (imagesLoaded === totalImages) {
          // All images are loaded, hide the loader
          loader.className += " hidden";
        }
      });
    });

    if (!response.ok) {
      throw new Error(`<h2>4-oh-4, Oops something went wrong here</h2>`);
    }

    createHtml(info);
  } catch (err) {
    let error = document.getElementById("details");
    error.innerHTML = err;
  }
}
