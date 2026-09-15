const programmes =
JSON.parse(localStorage.getItem("programs")) || [];

/* GET FAVORITES */

let favoris =
JSON.parse(localStorage.getItem("favoris"))
|| [];

/* CONTAINER */

const cardsContainer =
document.querySelector(".cards");

/* RENDER FAVORITES */

function renderFavorites() {

  cardsContainer.innerHTML = "";

  const favoriteProgrammes =
  programmes.filter(programme =>
    favoris.includes(programme.name)
  );

  if (favoriteProgrammes.length === 0) {

    cardsContainer.innerHTML = `
      <h3>No favorite programs yet ❤️</h3>
    `;

    return;
  }

  favoriteProgrammes.forEach(programme => {

    cardsContainer.innerHTML += `

      <div class="card">

        <img
        src="${programme.image}"
        alt="${programme.name}">

        <div class="card-content">

          <h3>${programme.name}</h3>

          <p>
            ${programme.description}
          </p>

          <button
          class="remove-btn"
          data-name="${programme.name}">
            Remove ❌
          </button>

        </div>

      </div>

    `;

  });

}

/* REMOVE FAVORITE */

cardsContainer.addEventListener("click",(e)=>{

  if(
    e.target.classList.contains("remove-btn")
  ){

    const name =
    e.target.dataset.name;

    favoris =
    favoris.filter(item =>
      item !== name
    );

    localStorage.setItem(
      "favoris",
      JSON.stringify(favoris)
    );

    renderFavorites();

  }

});

/* FIRST LOAD */

renderFavorites();