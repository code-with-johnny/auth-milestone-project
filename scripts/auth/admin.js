import { API_URL } from "../../constants.js";

(async () => {
  try {
    const users = (await axios.get(`${API_URL}/admin/users`)).data;
    const tableBody = document.querySelector("table > tbody");

    if (!tableBody) throw new Error("No table to insert users to.");

    const rows = users.map((user) => createUserRow(user));
    tableBody.append(...rows);
  } catch (err) {
    handleErr(err, "Failed to fetch users.");
  }
})();

function createUserRow(user) {
  const row = document.createElement("tr");
  const tdUsername = document.createElement("td");
  const tdEmail = document.createElement("td");
  const tdRole = document.createElement("td");
  const tdDelete = document.createElement("td");
  const roleSelect = document.createElement("select");
  const deleteButton = document.createElement("button");

  roleSelect.append(
    ...["user", "admin"].map((role) => {
      const option = document.createElement("option");
      option.value = role;
      option.innerText = role.charAt(0).toUpperCase() + role.slice(1);
      return option;
    })
  );

  roleSelect.value = user.role;
  roleSelect.addEventListener("change", async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/admin/users/${user.id}`, {
        role: e.target.value,
      });
    } catch (err) {
      handleErr(err, "Failed to update user role.");
    }
  });

  deleteButton.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
  deleteButton.type = "button";
  deleteButton.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      await deleteUser(user.id);
      row.remove();
    } catch (err) {
      handleErr(err, "Failed to delete user.");
    }
  });

  tdUsername.innerText = user.username;
  tdEmail.innerText = user.email;
  tdRole.append(roleSelect);
  tdDelete.append(deleteButton);

  row.append(tdUsername, tdEmail, tdRole, tdDelete);
  return row;
}

function deleteUser(userId) {
  return axios.delete(`${API_URL}/admin/users/${userId}`);
}

function handleErr(err, message) {
  if (
    "response" in err &&
    "status" in err.response &&
    [401, 403].includes(err.response.status)
  ) {
    window.location.href = "/";
    return;
  }
  console.error(err);
  alert(message);
}
