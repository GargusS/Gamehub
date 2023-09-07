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

    createHtml(info);
  } catch (error) {
    console.log(error);
  }

  function createHtml(info) {
    gameInfo.innerHTML = `
        <div class="" data-id="${info.id}">
        <button class="card-button"><a class="card-link" href="../html/buy.html">Back To Games</a></button>
        <h1>${info.title}</h1>
        <h2>$ ${info.price}</h2>
        <img class="detail-img" src="${info.image}" alt="A picture of the game ${info.title}">
        <h2 class="detail-description">${info.description}</h2>
        <button class="card-button"><a class="card-link" href="../html/cart.html">Add To Cart</a></button>
        </div>
        </div>`;
  }

  
}
