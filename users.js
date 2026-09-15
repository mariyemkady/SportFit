export let users = [
  {
    name: "Ahmed",
    age: 22
  },
  {
    name: "Sarra",
    age: 20
  },
  {
    name: "Ali",
    age: 25
  }
];

export function deleteUser(index) {
  users.splice(index, 1);
}