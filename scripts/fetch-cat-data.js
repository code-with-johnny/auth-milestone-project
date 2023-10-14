import { API_URL } from "../constants.js";

const fetchCatData = async () => {
  const response = await axios.get(`${API_URL}/cat-data`);
  return response.data;
};

(async () => {
  const catData = await fetchCatData();
  const tableBody = document
    .getElementById("cat-comparison")
    .querySelector("tbody");

  catData.forEach((cat) => {
    const tr = document.createElement("tr");

    Object.entries(cat).forEach(([key, value]) => {
      const td = document.createElement("td");

      if (typeof value === "boolean") {
        const content = value ? "&#x2714;" : "&#10060;";
        td.innerHTML = content;
        if (value) {
          td.classList.add("check-mark");
        }
      }

      if (typeof value === "string") {
        td.innerText = value.charAt(0).toUpperCase() + value.slice(1);
      }

      if (typeof value === "number") {
        td.innerText = key === "weight" ? `${value}lbs` : value;
      }

      tr.appendChild(td);
    });

    tableBody.appendChild(tr);
  });
})();
