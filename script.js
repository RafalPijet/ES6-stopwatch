class Stopwatch extends React.Component {
    constructor() {
        super();
        this.state = {
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        }
    }

    pad0(value) {
        let result = value.toString();

        if (result.length < 2) {
            result = `0${result}`;
        }
        return result;
    }

    format(times) {
        return `${this.pad0(this.state.times.minutes)}:${this.pad0(this.state.times.seconds)}:${this.pad0(Math.floor(this.state.times.miliseconds))}`;
    }

    start() {

        if (!this.state.running) {
            this.setState({
                running: true
            });
            setInterval(() => {

                if (this.state.running) {
                    this.setState({
                        times: this.calculate(this.state.times)
                    })
                }
            }, 10)
        }
    }

    stop() {
        this.setState({
            running: false
        })
    }

    calculate(times) {
        let result = times;
        result.miliseconds += 1;

        if (result.miliseconds >= 100) {
            result.seconds += 1;
            result.miliseconds = 0;
        }

        if (result.seconds >= 60) {
            result.minutes += 1;
            result.seconds = 0;
        }
        return result;
    }

    reset() {
        this.setState({
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        })
    }
    
    addToList() {
        document.querySelector(".stopwatch").classList.add("mark-score");
        let element = document.createElement("li");
        element.innerText = this.format(this.state.times);
        document.querySelector(".results").appendChild(element);
        setTimeout(() => document.querySelector(".stopwatch").classList.remove("mark-score"), 500);
    }

    eraseList() {
        let scoresList = document.querySelector(".results");
        while (scoresList.hasChildNodes()) {
            scoresList.removeChild(scoresList.lastChild)
        }
    }

    render() {
        return (
            <nav className="main">
                <button onClick={this.start.bind(this)} id="start">Start</button>
                <button onClick={this.stop.bind(this)} id="stop">Stop</button>
                <button onClick={this.reset.bind(this)} id="reset">Reset</button>
                <button onClick={this.addToList.bind(this)} id="add-score">Add score</button>
                <button onClick={this.eraseList.bind(this)} id="clear">Clear scores</button>
                <div className="stopwatch">{this.format(this.state.times)}</div>
                <ul className="results"></ul>
            </nav>
        )
    }
}

ReactDOM.render(<Stopwatch/>, document.getElementById("app"));