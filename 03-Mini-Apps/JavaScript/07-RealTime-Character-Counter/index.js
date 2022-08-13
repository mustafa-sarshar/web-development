const txtBioEl = document.getElementById("txt-bio")
const txtTotalChars = document.getElementById("total-characters")
const txtRemainingChars = document.getElementById("remaining-characters")

txtBioEl.addEventListener("keydown", (event) => {
    updateCounter()
})

function updateCounter() {
    let maxCharLen = txtBioEl.getAttribute("maxlength")
    let curChars = txtBioEl.value.length
    txtTotalChars.textContent = curChars
    txtTotalChars.style.setProperty("--bkTotalCharsOpacity", curChars/maxCharLen)

    txtRemainingChars.textContent = maxCharLen - curChars
    txtRemainingChars.style.setProperty("--bkRemCharsOpacity", curChars/maxCharLen)

    if (curChars == maxCharLen) txtBioEl.style.setProperty("--txtBioFontColor", "green")
    else txtBioEl.style.setProperty("--txtBioFontColor", "black")
}

window.onload = (event) => {
    updateCounter()
}