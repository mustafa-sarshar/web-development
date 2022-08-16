const imgContainerEl = document.querySelector(".image-container")
const btnPrevEl = document.querySelector(".prev")
const btnNextEl = document.querySelector(".next")

let currentImgID = 0
const nImages = document.querySelectorAll("img").length
const imgWidth = 500
const intervalDuration = 2000

let timer;
let imgChangeDirection = 1

btnNextEl.addEventListener("click", (event) => {    
    currentImgID++
    imgChangeDirection = 1
    clearTimeout(timer)
    updateImg()
})

btnPrevEl.addEventListener("click", (event) => {    
    currentImgID--
    imgChangeDirection = -1
    clearTimeout(timer)
    updateImg()
})

function updateImg() {
    if (currentImgID > nImages) currentImgID = 1
    else if (currentImgID < 1) currentImgID = nImages
    imgContainerEl.style.transform = `translateX(-${imgWidth*(currentImgID-1)}px)`

    timer = setTimeout(() => {
        currentImgID += imgChangeDirection
        updateImg()
    }, intervalDuration)
}

window.onload = (event) => {
    timer = setTimeout(() => {
        currentImgID += imgChangeDirection
        updateImg()
    }, intervalDuration)
}