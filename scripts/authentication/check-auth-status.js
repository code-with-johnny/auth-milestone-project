import { API_URL } from "../../constants.js";

/**
 * Use querySelectorAll to account for the fact that there is an element in both
 * the main nav and the mobile nav.
 */
const navAccount = document.querySelectorAll(".header__nav-account");
const navAccess = document.querySelectorAll(".header__nav-access");
const username = document.querySelectorAll(".username");

(async () => {
  try {
    const r = await axios.get(`${API_URL}/who-am-i`);
    navAccount.forEach((e) => (e.style.display = "flex"));
    username.forEach((e) => (e.innerText = r.data));
  } catch (err) {
    if (err.response.status === 401) {
      navAccess.forEach((e) => (e.style.display = "flex"));
    }
  }
})();
