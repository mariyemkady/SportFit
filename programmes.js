const defaultPrograms = [
  {
    id: "1",
    name: "Musculation",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd",
    description: "Build strength and muscle with professional workouts."
  },

  {
    id: "2",
    name: "Weight Loss",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a",
    description: "Burn calories and achieve your ideal weight."
  },

  {
    id: "3",
    name: "Cardio",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48",
    description: "Improve endurance and cardiovascular health."
  },

  {
    id: "4",
    name: "Yoga",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
    description: "Increase flexibility and reduce stress."
  }
];


const savedPrograms =
JSON.parse(localStorage.getItem("programs")) || [];


const programmes = [
  ...defaultPrograms,
  ...savedPrograms
];

const container = document.getElementById("programmesContainer");

// render cards
function renderPrograms() {
  container.innerHTML = "";

  programmes.forEach((p, index) => {
    container.innerHTML += `
      <div class="programme-card" data-name="${p.name.toLowerCase()}">

        <img src="${p.image}" alt="${p.name}">

        <div class="programme-content">
          <h3>${p.name}</h3>
          <p>${p.description}</p>
         <a href="prog.html?id=${p.id}" class="details-btn">
                 View Details
         </a>
          <button class="fav-btn" data-index="${index}">
            ❤️ Add To Favorites
          </button>
        </div>

      </div>
    `;
  });

  attachFavorites();
}

renderPrograms();


// FAVORITES
function attachFavorites() {
  const favButtons = document.querySelectorAll(".fav-btn");

  favButtons.forEach(button => {
    button.addEventListener("click", () => {
      const index = button.dataset.index;
      const selected = programmes[index];

      let favoris = JSON.parse(localStorage.getItem("favoris")) || [];

      if (!favoris.includes(selected.name)) {
        favoris.push(selected.name);
        localStorage.setItem("favoris", JSON.stringify(favoris));
        alert("Added to Favorites ❤️");
      } else {
        alert("Already in Favorites ❤️");
      }
    });
  });
}


// SEARCH + FILTER
const searchInput = document.getElementById("search");
const filterButtons = document.querySelectorAll(".filter-btn");

let currentFilter = "all";

searchInput.addEventListener("input", filterCards);

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter.toLowerCase();
    filterCards();
  });
});

function filterCards() {
  const value = searchInput.value.toLowerCase();
  const cards = document.querySelectorAll(".programme-card");

  cards.forEach(card => {
    const name = card.dataset.name;
    const desc = card.querySelector("p").textContent.toLowerCase();

    const matchSearch = name.includes(value) || desc.includes(value);
    const matchFilter = currentFilter === "all" || name.includes(currentFilter);

    if (matchSearch && matchFilter) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

JSON.parse(localStorage.getItem("programs"))