import { UsersPage, initUsersPage } from "../pages/users.js";
import { DashboardPage } from "../pages/dashboard.js";
import { ProgramsPage  , initProgramsPage} from "../pages/programs.js";

const routes = {
  dashboard: DashboardPage,
  users: UsersPage,
  programs: ProgramsPage
};

function router() {
  const hash = window.location.hash.replace("#", "") || "dashboard";

  const container = document.getElementById("content");

  container.innerHTML = routes[hash]();

  // ⬇️ مهم: بعد render
requestAnimationFrame(() => {

  if (hash === "users") {
    initUsersPage();
  }

  if (hash === "programs") {
    initProgramsPage();
  }

});

  setActiveLink();
}
/* ================= NAVIGATION ================= */
function initNavigation() {
  const links = document.querySelectorAll(".sidebar a");

  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.hash = link.dataset.link;
    });
  });
}

/* ================= ACTIVE LINK ================= */
function setActiveLink() {
  const links = document.querySelectorAll(".sidebar a");
  const current = window.location.hash.replace("#", "") || "dashboard";

  links.forEach(link => {
    link.classList.toggle("active", link.dataset.link === current);
  });
}

/* INIT */
window.addEventListener("load", () => {
  initNavigation();
  router();
});

window.addEventListener("hashchange", router);

console.log(routes);