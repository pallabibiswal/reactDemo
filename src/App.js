import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';

class Button extends React.Component {

    handleClick = () => {
        this.props.onClickFunction(this.props.increamentValue);
    };

    render() {
        return (
            <button onClick = {this.handleClick}> + {this.props.increamentValue} </button>
        );
    }
}

const Result = (props) => {
    return (
        <div> {props.increamentValue} </div>
    );
};

const Card = (props) => {
    return (
        <div style={{margin: '1em'}}>
            <img width = "75" src={props.avatar_url} />
            <div style={{display:'inline-block', marginLeft:10}}>
                <div style={{fontSize:'1.5em', fontWeight:'bold'}}>
                    {props.login}
                </div>
            </div>
        </div>
    );
};



const CardList = (props) => {
    return (
        <div>
            {props.card.map( card => <Card key = {card.id } {...card} />)};
        </div>
    );
};



class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {UserName : ''};
    }

    handleSubmit = (event) => {
        event.preventDefault();
        axios.get(`https://api.github.com/users/${this.state.UserName}`)
            .then(resp => {
                this.props.onSubmit(resp.data);
                this.setState({ UserName : ''});
            });
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="test"
                    value = {this.state.UserName}
                    onChange = {(event) => this.setState({UserName : event.target.value})}
                    placeholder="GitHub Username" required/>
                    <button type="submit"> Add card </button>
                </form>
            </div>
        );
    };
}


class Inc extends React.Component {

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
            <Button increamentValue = {1} onClickFunction = {this.increamentCounter}/>
            <Button increamentValue = {5} onClickFunction = {this.increamentCounter}/>
            <Button increamentValue = {10} onClickFunction = {this.increamentCounter}/>
            <Button increamentValue = {100} onClickFunction = {this.increamentCounter}/>
            <Result increamentValue = {this.state.counter}/>
            <Form onSubmit={this.addNewCard}/>
            <CardList card={this.state.cards} />
        </div>
        );
    }
}


export default Inc;