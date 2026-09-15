import { getUsers, saveUsers } from "../storage.js";

// ➕ ADD
export function addUser(user) {
  const users = getUsers();

  const newUser = {
    id: Date.now().toString(),
    ...user
  };

  users.push(newUser);
  saveUsers(users);
}

// ❌ DELETE
export function deleteUser(id) {
  const users = getUsers();
  saveUsers(users.filter(u => u.id !== id));
}

// ✏️ UPDATE
export function updateUser(updatedUser) {
  const users = getUsers();

  const updated = users.map(u =>
    u.id === updatedUser.id ? updatedUser : u
  );

  saveUsers(updated);
}

// 📥 GET ALL
export function getAllUsers() {
  return getUsers();
}
