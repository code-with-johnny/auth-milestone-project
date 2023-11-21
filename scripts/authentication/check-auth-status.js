import { API_URL } from "../../constants.js";

const navAccount = document.querySelectorAll(".header__nav-account");
const navAccess = document.querySelectorAll(".header__nav-access");

(async () => {
  try {
    await axios.get(`${API_URL}/who-am-i`);
    navAccount.forEach((e) => (e.style.visibility = "visible"));
  } catch (err) {
    if (err.response.status === 401) {
      navAccess.forEach((e) => (e.style.visibility = "visible"));
    }
  }
})();
