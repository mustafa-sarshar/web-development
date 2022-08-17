const bodyEl = document.querySelector("body")
const chkBoxToggle = document.getElementById("chkBox-toggle")

chkBoxToggle.addEventListener("change", (event) => {
    updateBody()
    updateLocalStorage()
})

function updateBody() {
    if (chkBoxToggle.checked)
        bodyEl.style.backgroundColor = "darkgray"
    else
        bodyEl.style.backgroundColor = "white"
}

function updateLocalStorage() {
    localStorage.setItem(
        "mode",
        JSON.stringify(chkBoxToggle.checked)
    )
}

window.onload = () => {
    chkBoxToggle.checked = JSON.parse(localStorage.getItem("mode"))
    updateBody()
}