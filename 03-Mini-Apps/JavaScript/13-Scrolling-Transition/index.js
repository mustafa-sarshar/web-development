const bgImageEl = document.getElementById("bg-image")

window.addEventListener("scroll", (event) => {
    updateImage()
})

function updateImage() {
    bgImageEl.style.opacity = 1 - window.scrollY/bgImageEl.offsetHeight
    bgImageEl.style.backgroundSize = 100 + window.scrollY/10 + "%"
}