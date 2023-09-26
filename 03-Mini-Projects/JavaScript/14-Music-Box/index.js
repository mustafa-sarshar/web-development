const kits = ["crash", "kick", "snare", "tom"]

const containerEl = document.querySelector(".container")

kits.forEach((kit) => {
    const btnKitEl = document.createElement("button")
    const audioEl = document.createElement("audio")
    btnKitEl.classList.add("btn")
    btnKitEl.textContent = kit
    btnKitEl.style.backgroundImage = "url(./images/"+kit+".png)"
    audioEl.src = "./sounds/"+kit+".mp3"    

    containerEl.append(btnKitEl)
    containerEl.append(audioEl)

    btnKitEl.addEventListener("click", (event) => {
        audioEl.play()
    })
    window.addEventListener("keydown", (event) => {
        if (event.key === kit.slice(0, 1)) {
            audioEl.play()
            btnKitEl.style.transform = "scale(0.9)"
            setTimeout(() => {
                btnKitEl.style.transform = "scale(1)"
            }, 100)
        }
    })
})