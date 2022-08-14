const mainContainerEl = document.querySelector(".main-container")
const popupContainerEl = document.querySelector(".popup-container")
const btnJoinEl = document.querySelector(".btn-join")
const btnJoinPopupEl = document.querySelector(".btn-join-popup")
const btnCloseIconEl = document.querySelector(".close-icon")

btnJoinEl.addEventListener("click", (event) => {
    mainContainerEl.classList.add("blur")
    popupContainerEl.classList.remove("hide")
})

btnJoinPopupEl.addEventListener("click", (event) => {
    popupContainerEl.classList.add("hide")
    mainContainerEl.classList.remove("blur")    
})

btnCloseIconEl.addEventListener("click", (event) => {
    popupContainerEl.classList.add("hide")
    mainContainerEl.classList.remove("blur")    
})
