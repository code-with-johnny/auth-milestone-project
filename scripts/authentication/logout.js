import { API_URL } from "../../constants.js";

const logoutForm = document.getElementById("logout");
const navAccount = document.querySelectorAll(".header__nav-account");
const navAccess = document.querySelectorAll(".header__nav-access");

logoutForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    await axios.post(`${API_URL}/logout`);
    window.location.href = "/";
    navAccount.forEach((e) => (e.style.visibility = "hidden"));
    navAccess.forEach((e) => (e.style.visibility = "visible"));
  } catch (err) {
    console.error(err);
  }
});
