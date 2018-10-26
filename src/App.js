import React from 'react';
import ReactDOM from 'react-dom';
import IncrementNumber from './IncrementNumber';
import GitUser from './GitUser';
import Game from './Game';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            counter:0,
            cards : []
        };
    }

    increamentCounter = (increamentValue) => {
        this.setState( prevState => ({
        counter:prevState.counter + increamentValue
    }))};

    addNewCard = (cardInfo) => {
        this.setState( prevState => ({
            cards : prevState.cards.concat(cardInfo)
        }));
    };

    render() {
        return (
        <div>
            <IncrementNumber counter={this.state.counter}
                             incrementMethod = {this.increamentCounter}/>
            <GitUser onSubmit={this.addNewCard} card={this.state.cards}/>
            <Game />
        </div>
        );
    }
}


export default App;