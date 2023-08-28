// fetch with error handling
const apiUrl = "https://api.noroff.dev/api/v1/gamehub";

fetch(apiUrl)
  .then((resp) => {
    //console.log(resp);
    //error checking
    //200-299
    if (!resp.ok)
      throw new Error("was not a valid response, check the code in fetch.js");
    return resp.json();
  })
  .then((dataArray) => {
    //console.log(dataArray);
    let buy = document.getElementById("dataArray");
    buy.innerHTML = dataArray
      .map(({ id, title, description, image, price }) => {
        return `<div class="card-container">
      <div class="card" data-id="${id}">
        <h4>${title}</h4>
        <img class="card-img" src="${image}" alt="${description}">
        <div class="modal-container">
          <input class="modal-toggle" id="modal-exit1" type="checkbox">
          <button class="button">Read More</button>
          <div class="modal-backdrop">
            <div class="modal-content">
              <label class="modal-close" for="modal-exit1">X</label>
              <h2>${title}</h2>
              <hr />
              <p>${description}</p>
              <hr>
              <p>${price}</p>
              <hr>
              <img class="card-img" src="${image}" alt="${description}">
              <hr>
              <button class="card-button"><a class="card-link" href="../html/cart.html">Add To Cart</a></button>
            </div>
          </div>
        </div>
        <button class="card-button"><a class="card-link" href="../html/cart.html">Add To Cart</a></button>
      </div>
    </div>`;
      })
      .join("");
  })
  .catch((err) => {
    console.warn(err.message);
  });
