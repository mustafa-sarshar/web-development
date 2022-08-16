const randomNumScaleFactor = 3000
const nMoreImages = 10

const imgContainerEl = document.querySelector(".image-container")
const btnLoadMore = document.querySelector(".btn")

btnLoadMore.addEventListener("click", (event) => {
    for (let i=0; i<nMoreImages; i++) {
        loadMoreImages()
    }
})

function loadMoreImages() {
    const newImageEl = document.createElement("img")
    newImageEl.src = `https://picsum.photos/300?random=${Math.floor(Math.random()*randomNumScaleFactor)}`
    imgContainerEl.appendChild(newImageEl)
}

window.onload = (event) => {
    btnLoadMore.textContent = `Load ${nMoreImages} more random images ...`
    for (let i=0; i<nMoreImages; i++) {
        loadMoreImages()
    }
}