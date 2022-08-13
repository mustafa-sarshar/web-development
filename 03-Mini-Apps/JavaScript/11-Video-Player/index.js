const btnWatchEL = document.querySelector(".btn")
const btnCloseIcon = document.querySelector(".close-icon")
const trailerContainerEl = document.querySelector(".trailer-container")

btnWatchEL.addEventListener("click", (event) => {
    trailerContainerEl.classList.remove("active")
})

btnCloseIcon.addEventListener("click", (event) => {
    trailerContainerEl.classList.add("active")
})
