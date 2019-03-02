class Stopwatch {
    constructor(display) {
        this.running = false;
        this.display = display;
        this.reset();
        this.print(this.times);
    }

    reset() {
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        }
    }

    print() {
        return this.display.innerText = this.format(this.times);
    }

    format(times) {
        return `${pad0(this.times.minutes)}:${pad0(this.times.seconds)}:${pad0(Math.floor(this.times.miliseconds))}`;
    }

    start() {

        if (!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step() {

        if (!this.running) return;
        this.calculate();
        this.print();
    }

    calculate() {
        this.times.miliseconds += 1;

        if (this.times.miliseconds >= 100) {
            this.times.seconds += 1;
            this.times.miliseconds = 0;
        }

        if (this.times.seconds >= 60) {
            this.times.minutes += 1;
            this.times.seconds = 0;
        }
    }

    stop() {
        this.running = false;
        clearInterval(this.watch);
    }

    resetCounter() {
        this.reset();
        this.print();
    }

    addToList() {
        this.display.classList.add("mark-score");
        let element = document.createElement("li");
        element.innerText = this.print();
        document.querySelector(".results").appendChild(element);
        setTimeout(() => this.display.classList.remove("mark-score"), 500);
    }

    eraseList() {
        let scoresList = document.querySelector(".results");

        while (scoresList.hasChildNodes()) {
            scoresList.removeChild(scoresList.lastChild);
        }

    }
}

const stopwatch = new Stopwatch(document.querySelector(".stopwatch"));
let startButton = document.getElementById("start");
let stopButton = document.getElementById("stop");
let resetButton = document.getElementById("reset");
let addButton = document.getElementById("add-score");
let clearButton = document.getElementById("clear");
startButton.addEventListener("click", () => stopwatch.start());
stopButton.addEventListener("click", () => stopwatch.stop());
resetButton.addEventListener("click", () => stopwatch.resetCounter());
addButton.addEventListener("click", () => stopwatch.addToList());
clearButton.addEventListener("click", () => stopwatch.eraseList());

function pad0(value) {
    let result = value.toString();

    if (result.length < 2) {
        result = "0" + result;
    }
    return result;
}

