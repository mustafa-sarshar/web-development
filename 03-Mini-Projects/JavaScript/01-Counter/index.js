let count = 0;
let countOnceSaved = false;
counter = document.getElementById("lbl-count");
savedCount = document.getElementById("lbl-saved-count");

counter.innerText = count;

function increment() {
    count++;
    counter.innerText = count;
};

function reset() {
    count = 0;
    counter.innerText = count;
    // savedCount.innerText = "Previous entries:";
    savedCount.textContent = "Previous entries:";
    countOnceSaved = false;
};

function save() {
    if (countOnceSaved === false) {
        savedCount.innerText = savedCount.textContent + " " + count;
        countOnceSaved = true;
    } else {
        savedCount.innerText = savedCount.textContent + " + " + count;
    }
    count = 0;
    counter.innerText = count;
};