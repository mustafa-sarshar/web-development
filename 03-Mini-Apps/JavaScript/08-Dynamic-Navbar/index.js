const navbarEl = document.querySelector(".navbar")
const bottomContainer = document.querySelector(".bottom-container")
const textEl = document.querySelector(".text")

window.addEventListener("scroll", (event) => {
    let scrollYThreshold = bottomContainer.offsetTop - navbarEl.offsetHeight - parseFloat(getComputedStyle(textEl)["margin-top"])
    if (window.scrollY > scrollYThreshold) navbarEl.classList.add("active")
    else navbarEl.classList.remove("active")

    console.log("Scrolling");
})