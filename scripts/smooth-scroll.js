const navLinks = document.querySelectorAll("nav a");
const backToTopLink = document.getElementById("back-to-top");

[...navLinks, backToTopLink].forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const href = link.getAttribute("href");
    document.querySelector(href).scrollIntoView({
      behavior: "smooth",
    });
  });
});
