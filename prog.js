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



const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const programme = programmes.find(
  p => String(p.id) === String(id)
);


if (programme) {

  document.getElementById("title").textContent = programme.name;
  document.getElementById("desc").textContent = programme.description;
  document.getElementById("img").src = programme.image;


  const favBtn = document.getElementById("favBtn");


  favBtn.addEventListener("click", () => {

    let favoris =
    JSON.parse(localStorage.getItem("favoris")) || [];


    if (!favoris.includes(programme.name)) {

      favoris.push(programme.name);

      localStorage.setItem(
        "favoris",
        JSON.stringify(favoris)
      );

      alert("Added to Favorites ❤️");

    } else {

      alert("Already in Favorites ❤️");

    }

  });


} else {

  document.getElementById("title").textContent =
  "Programme Not Found";

}
localStorage.getItem("programs")