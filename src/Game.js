import React from 'react';
import ReactDOM from 'react-dom';



const Stars = (props) => {

    let stars = [];
    for(let i = 0; i < props.numberOfstars; i++) {
        stars.push(<i key={i} className="fa fa-star"></i>)
    }
    return (
        <div className="col-5">
            {stars}
        </div>
    );
};

const Button = (props) => {
    let button;

    switch(props.isCorrectAnswer) {
        case true:
            button = <button className="btn btn-success" onClick={props.acceptAnswer}>
                <i className="fa fa-check"></i>
            </button>;
            break;
        case false:
            button = <button className="btn btn-danger">
                <i className="fa fa-times"></i>
            </button>;
            break;
        default:
            button = <button className="btn"
                             onClick={props.checkAnswer}
                             disabled={props.selectedNumbers.length === 0}>=</button>;
            break;
    }

    return (
        <div className="col-2 text-center">
            {button}
            <br/><br/>
            <button className="btn btn-warning btn-sm" onClick={props.redraw}
            disabled={props.redraws === 0}>
                <i className="fa fa-refresh"></i> {props.redraws}
            </button>
            <span>
                {props.setInterval}
            </span>
        </div>
    );
};

const Answer = (props) => {
    return (
        <div className="col-5">
            {props.selectedNumbers.map((number,i) =>
                <span key={i} onClick={() => props.unselectNumbers(number)}>{number}</span>
            )}
        </div>
    );
};

const Numbers = (props) => {
    const numberClassName = (number) => {
        if (props.usedNumbers.indexOf(number) >= 0) {
            return 'used';
        }

        if (props.selectedNumbers.indexOf(number) >= 0) {
            return 'selected';
        }
    };

    return (
        <div className="card text-center">
            <div>
                {Numbers.list.map(
                    (number,i) =>
                        <span key={i}  className={numberClassName(number)}
                        onClick={() => props.selectNumber(number)}>
                            {number}
                        </span>
                )}
            </div>
        </div>
    );
};

const DoneFrame = (props) => {
    return (
        <div className="text-center">
            <h2> {props.doneStatus} </h2>
            <button className="btn btn-secondary" onClick={props.resetGame}>Play Again</button>
        </div>
    );
};

Numbers.list = [1,2,3,4,5,6,7,8,9];

class Game extends React.Component {

    static randomNumbers = () => 1 + Math.floor(Math.random() * 9);
    static initialState = () => ({
        selectedNumbers : [],
        numberOfstars : Game.randomNumbers(),
        isCorrectAnswer : null,
        usedNumbers : [],
        redraws:5,
        doneStatus: null,
        stopTimer : '',
        timer:100,
        startGame:false
    });

    constructor(props) {
        super(props);
        this.state = Game.initialState();
    }

    selectNumber = (numberClicked) => {
        if (this.state.selectedNumbers.indexOf(numberClicked) >= 0) {
            return;
        }
        if (this.state.usedNumbers.indexOf(numberClicked) >= 0) {
            return;
        }
        this.setState(prevState => ({
            isCorrectAnswer : null,
            selectedNumbers:prevState.selectedNumbers.concat(numberClicked)
        }), () => { if (this.state.startGame === true) { return; } this.state.stopTimer = setInterval(this.setTimer, 500);});
    };

    setTimer = () => {
        this.setState(prevState => ({
            startGame:true,
            timer:prevState.timer - 1
        }), this.updateDoneStatus);
    };

    unselectNumbers = (numberClicked) => {
        this.setState(prevState => ({
            isCorrectAnswer : null,
            selectedNumbers:prevState.selectedNumbers.filter(number => number !== numberClicked)
        }));
    };

    checkAnswer = () => {
        this.setState(prevState => ({
            isCorrectAnswer:prevState.numberOfstars === prevState.selectedNumbers.reduce((acc,n) =>{
                return acc +n;
            })
        }));
    };

    acceptAnswer = () => {
        this.setState(prevState => ({
            usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
            selectedNumbers : [],
            numberOfstars : Game.randomNumbers(),
            isCorrectAnswer : null
        }), this.updateDoneStatus);
    };

    redraw =() => {
        if (this.state.redraws === 0) {
            return;
        }
        this.setState(prevState => ({
            selectedNumbers : [],
            numberOfstars : Game.randomNumbers(),
            isCorrectAnswer : null,
            redraws:prevState.redraws - 1
        }), this.updateDoneStatus);
    };

    possibleCombinationSum = (arr, n) => {

        if (arr.indexOf(n) >= 0) {
            console.log(arr.indexOf(n));
            return true;
        }

        if (arr[0] > n) {
            return false;
        }

        if (arr[arr.length - 1] > n) {
            arr.pop();
            return this.possibleCombinationSum(arr, n);
        }
        var listSize = arr.length, combinationsCount = (1 << listSize)
        for (var i = 1; i < combinationsCount ; i++ ) {
            var combinationSum = 0;
            for (var j=0 ; j < listSize ; j++) {
                if (i & (1 << j)) {
                    combinationSum += arr[j];
                }
            }
            if (n === combinationSum) {
                return true;
            }
        }
        return false;
    };

    posibleSolutions = ({numberOfstars, usedNumbers}) => {

        let rangeNumbers = [1,2,3,4,5,6,7,8,9];
        const posibleNumbers = rangeNumbers.filter(number =>
            usedNumbers.indexOf(number) === -1
        );

        return this.possibleCombinationSum(posibleNumbers, numberOfstars);
    };

    updateDoneStatus = () => {
        this.setState(prevState => {

            if (prevState.usedNumbers.length === 9) {
                return {doneStatus : 'Done Nice !'};
            } else if (this.state.timer === 0
                || (this.state.redraws === 0 && !this.posibleSolutions(prevState))
            ) {
                clearInterval(this.state.stopTimer);
                return {doneStatus : 'Game Over !'};

            }
        });
    };

    resetGame = () => {
        this.setState(Game.initialState());
    };

    render() {
        return (
            <div className="container">
                <h3>Play Nine</h3>
                <hr />
                <div className="row">
                    <Stars numberOfstars={this.state.numberOfstars}/>
                    <Button  selectedNumbers={this.state.selectedNumbers}
                        checkAnswer={this.checkAnswer} isCorrectAnswer={this.state.isCorrectAnswer}
                        acceptAnswer={this.acceptAnswer} redraw={this.redraw} redraws={this.state.redraws}
                        setInterval = {this.state.timer}/>
                    <Answer selectedNumbers={this.state.selectedNumbers}
                            unselectNumbers={this.unselectNumbers}/>
                </div>
                <br />
                {this.state.doneStatus ?
                    <DoneFrame resetGame={this.resetGame} doneStatus={this.state.doneStatus}/> :
                    <Numbers selectedNumbers={this.state.selectedNumbers}
                             selectNumber={this.selectNumber}
                             usedNumbers={this.state.usedNumbers}/>
                }
            </div>
        );
    };
}

export default Game;