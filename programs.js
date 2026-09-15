import { 
  getAllPrograms,
  addProgram,
  deleteProgram,
  updateProgram
} from "programsService.js";


let editId = null;
let searchText = "";

/* ================= PAGE ================= */

export function ProgramsPage(){

  return `

    <h1>Programs 🏋️</h1>


    <form id="programForm">
      <input 
        id="name" 
        placeholder="Program name"
      />

      <input 
        id="image" 
        placeholder="image"
      />

      <input 
        id="description" 
        placeholder="description"
      />


      <button 
        type="submit"
        id="submitBtn">
        Add
      </button>

    </form>

     <input 
      id="searchInput" 
      placeholder="Search programs..."
    />

    <table border="1" width="100%">

      <tbody id="programsTable"></tbody>

    </table>


  `;

}




/* ================= INIT ================= */

export function initProgramsPage(){


  const form = document.getElementById("programForm");
  const searchInput = document.getElementById("searchInput");



    // 🔍 SEARCH
searchInput.addEventListener("input", () => {

  searchText = searchInput.value.toLowerCase();

  renderPrograms();

});

    
  form.addEventListener("submit",(e)=>{

    e.preventDefault();


const name = document.getElementById("name").value;
const image = document.getElementById("image").value;
const description = document.getElementById("description").value;
 

if(
 !name.trim() ||
 !image.trim() ||
 !description.trim()
){
 alert("Please fill all fields");
 return;
}

    // ✅ Check duplicate program

const programs = getAllPrograms();


const programExists = programs.some(program =>

 program.name.toLowerCase() === name.toLowerCase()
  &&
  program.id !== editId

);


if(programExists){

  alert("Program already exists");
  return;

}


    if(editId === null){


     addProgram({
  name,
  image,
  description
});



    }else{


updateProgram({
  id: editId,
  name,
  image,
  description
});


      editId = null;

      document.getElementById("submitBtn").textContent="Add";

    }



    renderPrograms();

    form.reset();


  });



  renderPrograms();


}



/* ================= RENDER ================= */




function renderPrograms(){

  let programs = getAllPrograms();


  programs = programs.filter(program =>

(program.name || "").toLowerCase().includes(searchText)
||
(program.description || "").toLowerCase().includes(searchText)
  )


  const table = document.getElementById("programsTable");



  table.innerHTML = programs.map(p=>`


    <tr>

     <td>
<img src="${p.image}" width="80">
</td>

<td>${p.name}</td>

<td>${p.description}</td>


      <td>

        <button 
        class="edit-btn"
        data-id="${p.id}">
        Edit
        </button>


        <button 
        class="delete-btn"
        data-id="${p.id}">
        Delete
        </button>


      </td>


    </tr>


  `).join("");



  attachDeleteEvents();

  attachEditEvents();


}




/* ================= DELETE ================= */

function attachDeleteEvents(){

  document.querySelectorAll(".delete-btn")
  .forEach(btn=>{


    btn.addEventListener("click",()=>{


      deleteProgram(btn.dataset.id);


      renderPrograms();


    });


  });

}





/* ================= EDIT ================= */

function attachEditEvents(){


  document.querySelectorAll(".edit-btn")
  .forEach(btn=>{


    btn.addEventListener("click",()=>{


      const programs = getAllPrograms();


      const program = programs.find(
        p=>p.id === btn.dataset.id
      );

document.getElementById("name").value = program.name;
document.getElementById("image").value = program.image;
document.getElementById("description").value = program.description;



      editId = program.id;



      document.getElementById("submitBtn").textContent="Update";


    });


  });


}
