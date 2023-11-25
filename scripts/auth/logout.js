import { API_URL } from "../../constants.js";

const logoutForm = document.getElementById("logout");
const navAccount = document.querySelectorAll(".header__nav-account");
const navAccess = document.querySelectorAll(".header__nav-access");

logoutForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    await axios.post(`${API_URL}/logout`);
    window.location.href = "/";
    navAccount.forEach((e) => (e.style.display = "none"));
    navAccess.forEach((e) => (e.style.display = "flex"));
  } catch (err) {
    console.error(err);
  }
});
