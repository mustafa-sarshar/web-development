const btnEl = document.querySelector(".btn")

btnEl.addEventListener("mouseover", (event) => {
    let xPos = event.pageX - btnEl.offsetLeft
    let yPos = event.pageY - btnEl.offsetTop
        
    btnEl.style.setProperty("--bkColor", "orangered")
    btnEl.style.setProperty("--opacity", ".8")
    btnEl.style.setProperty("--xPos", xPos+"px")
    btnEl.style.setProperty("--yPos", yPos+"px")
    btnEl.innerText = "Yuuhuu 🤪"
})

btnEl.addEventListener("mouseout", (event) => {
    let xPos = event.pageX - btnEl.offsetLeft
    let yPos = event.pageY - btnEl.offsetTop    
    
    btnEl.style.setProperty("--bkColor", "orange")
    btnEl.style.setProperty("--opacity", ".5")
    btnEl.style.setProperty("--xPos", xPos+"px")
    btnEl.style.setProperty("--yPos", yPos+"px")
    btnEl.innerText = "Bye 😔"
    setTimeout(() => {btnEl.innerText = "Hi 😊"}, 1000)
})