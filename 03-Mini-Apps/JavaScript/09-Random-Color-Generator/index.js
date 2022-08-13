const colors = "0123456789abcdef"
const colorCodeLength = 6
const nColors = 500
const lumaThreshold = 120

const containerEl = document.querySelector(".container")

function generateColorBoxes() {
    for (let i=0; i<nColors; i++) {
        const divColorBox = document.createElement("div")
        const colorCode = randomColorPicker()
        divColorBox.classList.add("color-container")
        divColorBox.style.backgroundColor = colorCode
        divColorBox.style.color = colorDarknessChecker(colorCode)
        divColorBox.textContent = colorCode
        containerEl.append(divColorBox)
    }
}

function randomColorPicker() {
    let colorCode = "#"
    for (let i=0; i<colorCodeLength; i++) {
        colorCode += colors[Math.floor(Math.random() * colors.length)]
    }
    return colorCode
}

function colorDarknessChecker(colorCode) {  // Source: https://stackoverflow.com/questions/12043187/how-to-check-if-hex-color-is-too-black (accessed on 13.08.2022)
    let c = colorCode.substring(1);      // strip #
    let rgb = parseInt(c, 16);   // convert rrggbb to decimal
    let r = (rgb >> 16) & 0xff;  // extract red
    let g = (rgb >>  8) & 0xff;  // extract green
    let b = (rgb >>  0) & 0xff;  // extract blue

    let luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
    console.log(luma)
    if (luma < lumaThreshold) return "white"
    else return "black"
}

window.onload = (event) => {
    generateColorBoxes()
}