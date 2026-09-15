const KEY = "users";

export function getUsers() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

export function saveUsers(users) {
  localStorage.setItem(KEY, JSON.stringify(users));
}


const PROGRAMS_KEY = "programs";


export function getPrograms(){

  return JSON.parse(
    localStorage.getItem(PROGRAMS_KEY)
  ) || [];

}


export function savePrograms(programs){

  localStorage.setItem(
    PROGRAMS_KEY,
    JSON.stringify(programs)
  );

}