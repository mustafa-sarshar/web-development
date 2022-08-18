const secondHandEl = document.querySelector(".second-hand")
const minuteHandEl = document.querySelector(".minute-hand")
const hourHandEl = document.querySelector(".hour-hand")

function getTimeNow() {
    const dateNow = new Date()
    return [dateNow.getSeconds(), dateNow.getMinutes(), dateNow.getHours()]
}

function updateClock() {
    const timeNow = getTimeNow()
    secondHandEl.style.transform = `rotate(${timeNow[0]*6}deg)`
    minuteHandEl.style.transform = `rotate(${timeNow[1]*6}deg)`
    hourHandEl.style.transform = `rotate(${timeNow[2]*6}deg)`
}

setInterval(updateClock, 10)