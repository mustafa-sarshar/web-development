const btnWatchEL = document.querySelector(".btn")
const btnCloseIcon = document.querySelector(".close-icon")
const trailerContainerEl = document.querySelector(".trailer-container")
const videoEl = document.querySelector("video")

btnWatchEL.addEventListener("click", (event) => {
    trailerContainerEl.classList.remove("active")
})

btnCloseIcon.addEventListener("click", (event) => {
    trailerContainerEl.classList.add("active")
    videoEl.pause()
    videoEl.currentTime = 0
})
