const tabsEl = document.querySelector(".tabs")
const btnsEl = document.querySelectorAll(".btn")
const contentsEl = document.querySelectorAll(".content")

tabsEl.addEventListener("click", (event) => {
    const tabID = event.target.dataset.id
    if (tabID) {
        btnsEl.forEach((btn) => {
            btn.classList.remove("active")
        })
        event.target.classList.add("active")
        contentsEl.forEach((content) => {
            content.classList.remove("active")
        })
        const targetContentEl = document.getElementById("content-"+tabID)
        targetContentEl.classList.add("active")
    }
})