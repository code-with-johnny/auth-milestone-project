import { API_URL } from "../../constants.js";

/**
 * Use querySelectorAll to account for the fact that there is an element in both
 * the main nav and the mobile nav.
 */
const navAccount = document.querySelectorAll(".header__nav-account");
const navAccess = document.querySelectorAll(".header__nav-access");
const username = document.querySelectorAll(".username");
const adminLink = document.querySelectorAll(".admin-link");

(async () => {
  try {
    const r = await axios.get(`${API_URL}/who-am-i`);

    navAccount.forEach((e) => (e.style.display = "flex"));
    navAccess.forEach((e) => (e.style.display = "none"));

    username.forEach((e) => {
      const span = document.createElement("span");
      span.innerText = r.data.username;
      e.appendChild(span);
    });

    if (r.data.role === "admin") {
      adminLink.forEach((e) => (e.style.display = "block"));
    }
  } catch (err) {
    if (err.response.status === 401) {
      navAccess.forEach((e) => (e.style.display = "flex"));
      navAccount.forEach((e) => (e.style.display = "none"));
    }
  }
})();
