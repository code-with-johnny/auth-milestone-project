import { API_URL } from "../../constants.js";

const accessForm = document.getElementById("access-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const submit = document.getElementById("submit");
const loginLink = document.getElementById("login");
const registerLink = document.getElementById("register");
const urlParams = new URLSearchParams(window.location.search);
const mode = urlParams.get("mode");

(async () => {
  if (mode !== "login" && mode !== "register") {
    window.location.href = "/";
    return;
  }

  const isRegister = mode === "register";

  loginLink.style.display = isRegister ? "block" : "none";
  registerLink.style.display = isRegister ? "none" : "block";

  [username, confirmPassword].forEach((e, i) => {
    e.setAttribute(
      "type",
      isRegister ? `${i === 0 ? "text" : "password"}` : "hidden"
    );
  });

  submit.textContent = isRegister ? "Register" : "Login";

  accessForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (isRegister && password.value !== confirmPassword.value) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.post(`${API_URL}/${isRegister ? "register" : "login"}`, {
        username: isRegister ? username.value : null,
        email: email.value,
        password: password.value,
      });

      window.location.href = "/";
    } catch (err) {
      switch (err.response?.status) {
        case 409:
          alert("That email address already exists.");
          return;
        case 401:
          alert("Incorrect email or password.");
          return;
        default:
          console.error(err);
      }
    }
  });
})();
