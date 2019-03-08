"use strict";

// class Button extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             name: props.name
//         };
//     }
//
//     render() {
//         return React.createElement("a", {className: "button", href: "#", id: this.props.id}, this.state.name)
//     }
// }

var Stopwatch = React.createClass({
    displayName: "Stopwatch",


    getInitialState: function getInitialState() {
        return {
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        };
    },

    pad0: function pad0(value) {
        var result = value.toString();

        if (result.length < 2) {
            result = "0" + result;
        }
        return result;
    },

    format: function format(times) {
        return this.pad0(this.state.times.minutes) + ":" + this.pad0(this.state.times.seconds) + ":" + this.pad0(Math.floor(this.state.times.miliseconds));
    },

    start: function start() {
        var _this = this;

        if (!this.state.running) {
            this.setState({
                running: true
            });
            setInterval(function () {

                if (_this.state.running) {
                    _this.setState({
                        times: _this.calculate(_this.state.times)
                    });
                }
            }, 10);
        }
    },

    stop: function stop() {
        this.setState({
            running: false
        });
    },

    calculate: function calculate(times) {
        var result = times;
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
    },

    reset: function reset() {
        this.setState({
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        });
    },

    addToList: function addToList() {
        document.querySelector(".stopwatch").classList.add("mark-score");
        var element = document.createElement("li");
        element.innerText = this.format(this.state.times);
        document.querySelector(".results").appendChild(element);
        setTimeout(function () {
            return document.querySelector(".stopwatch").classList.remove("mark-score");
        }, 500);
    },

    eraseList: function eraseList() {
        var scoresList = document.querySelector(".results");
        while (scoresList.hasChildNodes()) {
            scoresList.removeChild(scoresList.lastChild);
        }
    },

    render: function render() {
        return React.createElement("nav", { className: "main" }, React.createElement("button", { onClick: this.start, id: "start" }, "Start"), React.createElement("button", { onClick: this.stop, id: "stop" }, "Stop"), React.createElement("button", { onClick: this.reset, id: "reset" }, "Reset"), React.createElement("button", { onClick: this.addToList, id: "add-score" }, "Add score"), React.createElement("button", { onClick: this.eraseList, id: "clear" }, "Clear scores"), React.createElement("div", { className: "stopwatch" }, this.format(this.state.times)), React.createElement("ul", { className: "results" }));
    }
    /*
        render: function () {
            return (
                React.createElement("nav", {className: "controls"},
                    React.createElement(Button, {onClick: this.start, name: "Start", id: "start"}, {}),
                    React.createElement(Button, {name: "Stop", id: "stop"}, {}),
                    React.createElement(Button, {name: "Reset", id: "reset"}, {}),
                    React.createElement(Button, {name: "Add score", id: "add-score"}, {}),
                    React.createElement(Button, {name: "Clear scores", id: "clear"}, {}),
                    React.createElement("div", {className: "stopwatch"}, this.state.counter),
                    React.createElement("ul", {className: "results"})
                )
            )
        }*/
});

var app = React.createElement(Stopwatch);
ReactDOM.render(app, document.getElementById("app"));
