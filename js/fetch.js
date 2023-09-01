async function fetchData() {
  try {
    const apiUrl = "https://api.noroff.dev/api/v1/gamehub";
    const resp = await fetch(apiUrl);

    if (!resp.ok) {
      throw new Error("4-oh-4, Oops something went wrong here");
    }

    const dataArray = await resp.json();

    let buy = document.getElementById("dataArray");
    buy.innerHTML = dataArray
      .map(({ id, title, description, image, price }) => {
        return `<div class="card-container">
          <div class="card" data-id="${id}">
            <h4>${title}</h4>
            <img class="card-img" src="${image}" alt="${description}">
            <div class="modal-container">
              <input class="modal-toggle" id="${id}" type="checkbox">
              <button class="button">Read More</button>
              <div class="modal-backdrop">
                <div class="modal-content">
                  <label class="modal-close" for="${id}">X</label>
                  <h2>${title}</h2>
                  <hr />
                  <p>${description}</p>
                  <hr>
                  <p class="price">$ ${price}</p>
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
  } catch (err) {
    let error = document.getElementById("browse");
    error.innerText = err;
  }
}

fetchData();
