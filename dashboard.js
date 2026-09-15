import { getAllUsers } from "usersService.js";
import { getAllPrograms } from "programsService.js";

export function DashboardPage() {

 
  const programs= getAllPrograms();
  const users = getAllUsers();

const activeMembers = users.filter(
  user => user.status === "active"
);

const inactiveMembers = users.filter(
  user => user.status === "inactive"
);
const latestUsers = users.slice(-5).reverse();

const latestPrograms = programs.slice(-5).reverse();
  return `
  <h1>Dashboard 🚀</h1>

  <div class="stats">

    <div class="card users-card">
      <div class="card-icon">👥</div>

      <div class="card-info">
        <h3>Total Users</h3>
        <p>${users.length}</p>
      </div>
    </div>

    <div class="card programs-card">
      <div class="card-icon">🏋️</div>

      <div class="card-info">
        <h3>Total Programs</h3>
        <p>${programs.length}</p>
      </div>
    </div>

    <div class="card active-card">
      <div class="card-icon">✅</div>

      <div class="card-info">
        <h3>Active Members</h3>
        <p>${activeMembers.length}</p>
      </div>

   
    </div>
     
         <div class="card inactive-card">

    <div class="card-icon">
        ❌
    </div>

    <div class="card-info">
        <h3>Inactive Members</h3>
        <p>${inactiveMembers.length}</p>
    </div>

</div>

  </div>

  <div class="dashboard-tables">

  <div class="dashboard-box">
    <h2>Latest Users</h2>

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>

        ${latestUsers.map(user => `

          <tr>

            <td>${user.name}</td>

            <td>${user.email}</td>

           <td>${user.status ?? "active"}</td>

          </tr>

        `).join("")}

      </tbody>

    </table>

  </div>



  <div class="dashboard-box">

    <h2>Latest Programs</h2>

    <table>

      <thead>

        <tr>

          <th>Name</th>

          <th>Description</th>

        </tr>

      </thead>

      <tbody>

        ${latestPrograms.map(program => `

          <tr>

            <td>${program.name}</td>

            <td>
${program.description.slice(0,40)}...
</td>

          </tr>

        `).join("")}

      </tbody>

    </table>

  </div>

</div>
`;
}
