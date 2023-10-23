const loader = document.querySelector(".loader");

async function fetchData() {
  try {
    const apiUrl = "https://cms.sonnesyn.no/wp-json/wc/store/products";
    const resp = await fetch(apiUrl);

    if (!resp.ok) {
      throw new Error("4-oh-4, Oops something went wrong here");
    }

    const dataArray = await resp.json();
    
    let buy = document.getElementById("dataArray");
    buy.innerHTML = dataArray
      .map(({ id, name, description, images }) => {
        return `<div class="card-container">
          <div class="card" data-id="${id}">
            <h4>${name}</h4>
            
            <img class="card-img" src="${images[0].src}" alt="Image of ${name}">
            <p>${description}</p>
            <button class="card-button"><a class="card-link" href="../html/details.html?id="${id}">View details</a></button>
          </div>
        </div>`;
      })
      .join("");

    // Select all images inside the fetchContainer
    const imagesToLoad = buy.querySelectorAll("img");

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
  } catch (err) {
    let error = document.getElementById("browse");
    error.innerText = err;
  }
}

fetchData();
