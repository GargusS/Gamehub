const loader = document.querySelector(".loader");

async function fetchData() {
  try {
    const apiUrl = "https://api.noroff.dev/api/v1/gamehub";
    const resp = await fetch(apiUrl);

    if (!resp.ok) {
      throw new Error("4-oh-4, Oops something went wrong here");
    }

    const dataArray = await resp.json();
    console.log(dataArray);
    let buy = document.getElementById("dataArray");
    buy.innerHTML = dataArray
      .map(({ id, title, description, image, price }) => {
        return `<div class="card-container">
          <div class="card" data-id="${id}">
            <h4>${title}</h4>
            
            <img class="card-img" src="${image}" alt="${description}">
            
            <button class="card-button"><a class="card-link" href="../html/details.html?id=${id}">View details</a></button>
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
