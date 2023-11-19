import { API_URL } from "../constants.js";

(async () => {
  try {
    const response = await axios.get(`${API_URL}/who-am-i`);
    console.log("response.data: ", response.data);
  } catch (err) {
    console.log(err.response.status);
    if (err.response.status === 401) {
      // instead of redirecting, just show login and register button
      window.location.href = "/login.html";
    }
  }
})();
