const loader = document.querySelector(".loader");

const gameInfo = document.getElementById("details");

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

const url = "https://api.noroff.dev/api/v1/gamehub/" + id;

fetchDetails();

async function fetchDetails() {
  try {
    const response = await fetch(url);
    const info = await response.json();

    function createHtml(info) {
      gameInfo.innerHTML = `
          <div class="details" data-id="${info.id}">
          <button class="card-button"><a class="card-link" href="../html/buy.html">Back To Games</a></button>
          <h1>${info.title}</h1>
          <h2>$ ${info.price}</h2>
          <img class="detail-img" src="${info.image}" alt="A picture of the game ${info.title}">
          <h2 class="detail-description">${info.description}</h2>
          <button class="card-button"><a class="card-link" href="../html/cart.html">Add To Cart</a></button>
          </div>
          </div>`;
          
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

