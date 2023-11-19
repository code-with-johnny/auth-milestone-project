import { API_URL } from "../../constants.js";

(async () => {
  try {
    const response = await axios.get(`${API_URL}/who-am-i`);
    console.log("response.data: ", response.data);
  } catch (err) {
    if (err.response.status === 401) {
      // instead of redirecting, just show login and register button
      console.log("you are not logged in");
    }
  }
})();
