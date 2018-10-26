import React from 'react';
import ReactDOM from 'react-dom';

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

class IncrementNumber extends React.Component {
    render() {
        return (
            <div>
                <Button increamentValue = {1} onClickFunction = {this.props.incrementMethod}/>
                <Button increamentValue = {5} onClickFunction = {this.props.incrementMethod}/>
                <Button increamentValue = {10} onClickFunction = {this.props.incrementMethod}/>
                <Button increamentValue = {100} onClickFunction = {this.props.incrementMethod}/>
                <Result increamentValue = {this.props.counter}/>
            </div>
        );
    }
}

export default IncrementNumber;