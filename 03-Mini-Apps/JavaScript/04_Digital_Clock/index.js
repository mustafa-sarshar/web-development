const txt_hour = document.getElementById("txt-hour")
const txt_minute = document.getElementById("txt-minute")
const txt_second = document.getElementById("txt-second")
const txt_ampm = document.getElementById("txt-ampm")
const txt_date = document.getElementById("txt-date")

function updateClock() {
    let date = new Date()
    let h = date.getHours()
    let m = date.getMinutes()
    let s = date.getSeconds()
    let ampm = "AM"
    let day = date.getDate()
    let month = date.toLocaleString([], { month: "short", }) // or date.toLocaleString("en-US", { month: "short", })
    let year = date.getFullYear()

    if (h > 12) {
        h = h-12
        ampm = "PM"
    }
    h = h<10 ? "0"+h : h
    m = m<10 ? "0"+m : m
    s = s<10 ? "0"+s : s
    day = day<10 ? "0"+day : day
    month = month<10 ? "0"+month : month

    txt_hour.textContent = h
    txt_minute.textContent = m
    txt_second.textContent = s
    txt_ampm.textContent = ampm
    txt_date.textContent = `${day}. ${month} ${year}`

    setTimeout(updateClock, 1)
}


window.onload = (event) => {
    updateClock()
}