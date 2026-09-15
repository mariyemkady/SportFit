import { getPrograms, savePrograms } from "../storage.js";


// ➕ ADD

export function addProgram(program){

  const programs = getPrograms();

  const newProgram = {
    id: Date.now().toString(),
    ...program
  };

  programs.push(newProgram);

  savePrograms(programs);

}



// 📥 GET ALL

export function getAllPrograms(){

  return getPrograms();

}



// ❌ DELETE

export function deleteProgram(id){

  const programs = getPrograms();

  savePrograms(
    programs.filter(p => p.id !== id)
  );

}



// ✏️ UPDATE

export function updateProgram(updatedProgram){

  const programs = getPrograms();


  const updated = programs.map(p =>

    p.id === updatedProgram.id
    ? updatedProgram
    : p

  );


  savePrograms(updated);

}
