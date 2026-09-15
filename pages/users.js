import { 
  getAllUsers, 
  addUser, 
  deleteUser, 
  updateUser 
} from "../services/usersService.js";


let editId = null;
let searchText = "";


/* ================= PAGE ================= */

export function UsersPage() {
  return `
    <h1>Users 👥</h1>

    <form id="userForm">
      <input id="name" placeholder="Name" />
      <input id="email" placeholder="Email" />
      <select id="status">

  <option value="active">
    Active
  </option>

  <option value="inactive">
    Inactive
  </option>

</select>
      <button type="submit" id="submitBtn">Add</button>
    </form>

    <input 
      id="searchInput" 
      placeholder="Search user..."
    />

    <table border="1" width="100%">
      <tbody id="usersTable"></tbody>
    </table>
  `;
}



/* ================= INIT ================= */

export function initUsersPage() {

  const form = document.getElementById("userForm");
  const searchInput = document.getElementById("searchInput");


  // 🔍 SEARCH
  searchInput.addEventListener("input", () => {

    searchText = searchInput.value.toLowerCase();

    renderUsers();

  });



  // ➕ ADD / ✏️ UPDATE

  form.addEventListener("submit", (e) => {

    e.preventDefault();


    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const status = document.getElementById("status").value;



    // ✅ Validation

    if (!name.trim() || !email.trim()) {

      alert("Please fill all fields");
      return;

    }



    // 📥 Get all users

    const users = getAllUsers();



    // 📧 Email duplicate check

    const emailExists = users.some(user =>

      user.email.toLowerCase() === email.toLowerCase()
      &&
      user.id !== editId

    );



    if (emailExists) {

      alert("Email already exists");
      return;

    }




    // ➕ ADD

    if (editId === null) {

      addUser({
        name,
        email,
        status
      });
console.log(localStorage.getItem("users"));

    } 

    // ✏️ UPDATE

    else {


      updateUser({

        id: editId,
        name,
        email

      });


      editId = null;

      document.getElementById("submitBtn").textContent = "Add";

    }



    renderUsers();

    form.reset();


  });



  renderUsers();

}



/* ================= RENDER USERS ================= */

function renderUsers() {


  let users = getAllUsers();



  // 🔍 SEARCH FILTER

  users = users.filter(user =>

    user.name.toLowerCase().includes(searchText)
    ||
    user.email.toLowerCase().includes(searchText)

  );



  const table = document.getElementById("usersTable");



  table.innerHTML = users.map(user => `

  <tr>

  <td>${user.name}</td>

  <td>${user.email}</td>

  <td>${user.status || "inactive"}</td>

  <td>
    <button class="edit-btn" data-id="${user.id}">
      Edit
    </button>

    <button class="delete-btn" data-id="${user.id}">
      Delete
    </button>
  </td>

</tr>


  `).join("");



  attachDeleteEvents();

  attachEditEvents();


}





/* ================= DELETE ================= */

function attachDeleteEvents() {


  document.querySelectorAll(".delete-btn")
  
  .forEach(btn => {


    btn.addEventListener("click", () => {


      deleteUser(btn.dataset.id);


      renderUsers();


    });


  });


}





/* ================= EDIT ================= */

function attachEditEvents() {


  document.querySelectorAll(".edit-btn")

  .forEach(btn => {


    btn.addEventListener("click", () => {


      const users = getAllUsers();


      const user = users.find(
        u => u.id === btn.dataset.id
      );



      document.getElementById("name").value = user.name;

      document.getElementById("email").value = user.email;

      document.getElementById("status").value = user.status;

      editId = user.id;



      document.getElementById("submitBtn").textContent = "Update";


    });


  });


}
