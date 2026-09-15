/* PROGRAMMES */
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



const cardsContainer = document.querySelector(".cards");

if(cardsContainer){
   renderCards();
}

/* RENDER CARDS */
function renderCards() {
  cardsContainer.innerHTML = "";

  programmes.forEach(programme => {
    cardsContainer.innerHTML += `
      <div class="card" data-name="${programme.name}">
        <img src="${programme.image}" alt="Workout">

        <div class="card-content">
          <h3>${programme.name}</h3>
          <p>${programme.description}</p>

          <div class="card-actions">
            <a href="prog.html?id=${programme.id}" class="card-btn">
 Explore →
</a>
          </div>
        </div>
      </div>
    `;
  });
}

/* SEARCH */
const searchInput = document.getElementById("searchInput");

function initSearch() {
  searchInput.addEventListener("keyup", () => {
    const value = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
      const name = card.dataset.name.toLowerCase();

      if (name.includes(value)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
}

renderCards();
initSearch();

/* MOBILE MENU */
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

/* BMI */
const weightInput = document.getElementById("weight");
const heightInput = document.getElementById("height");
const bmiBtn = document.getElementById("bmiBtn");
const result = document.getElementById("result");

bmiBtn.addEventListener("click", () => {
  const weight = Number(weightInput.value);
  const height = Number(heightInput.value);

  const bmi = weight / (height * height);

  if (bmi < 18.5) {
    result.innerHTML = `Your BMI: ${bmi.toFixed(1)} <br> Underweight`;
  } else if (bmi < 25) {
    result.innerHTML = `Your BMI: ${bmi.toFixed(1)} <br> Normal`;
  } else {
    result.innerHTML = `Your BMI: ${bmi.toFixed(1)} <br> Overweight`;
  }
});

/* CALORIES CALCULATOR (FIXED) */
const caloriesBtn = document.getElementById("caloriesBtn");
const caloriesResult = document.getElementById("caloriesResult");

caloriesBtn.addEventListener("click", () => {

  const age = Number(document.getElementById("age").value);
  const weight = Number(document.getElementById("calWeight").value);
  const height = Number(document.getElementById("calHeight").value);
  const gender = document.getElementById("gender").value;
  const activity = Number(document.getElementById("activity").value);
  const goal = document.getElementById("goal").value;

  let bmr;

  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  const maintenanceCalories = bmr * activity;

  let finalCalories;

  if (goal === "lose") {
    finalCalories = maintenanceCalories - 500;
  } else if (goal === "gain") {
    finalCalories = maintenanceCalories + 300;
  } else {
    finalCalories = maintenanceCalories;
  }

  caloriesResult.innerHTML = `
    Maintenance: ${Math.round(maintenanceCalories)} kcal <br>
    Your Plan: ${Math.round(finalCalories)} kcal
  `;
});