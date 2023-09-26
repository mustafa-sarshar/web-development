const bodyEl = document.querySelector("body")

bodyEl.addEventListener("mousemove", (event) => {
    generateBall()
})

function generateBall() {
    const mouseX = event.offsetX
    const mouseY = event.offsetY
    const spanEl = document.createElement("span")
    const iconSize = Math.floor(Math.random() * 100)
    spanEl.style.left = mouseX + "px"
    spanEl.style.top = mouseY + "px"
    spanEl.style.width = iconSize + "px"
    spanEl.style.height = iconSize + "px"
    bodyEl.append(spanEl)
    setTimeout((args) => { spanEl.remove() }, 3000)
}