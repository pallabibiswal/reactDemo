import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const Card = (props) => {
    return (
        <div style={{margin: '1em'}}>
            <img width = "75" src={props.avatar_url} />
            <div style={{display:'inline-block', marginLeft:10}}>
                <div style={{fontSize:'1.5em', fontWeight:'bold'}}>
                    {props.login}
                </div>
                {props.organizations_url}
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

class GitUser extends React.Component {
    render() {
        return (
            <div>
                <Form onSubmit={this.props.onSubmit}/>
                <CardList card={this.props.card} />
            </div>
        );
    }
}

export default GitUser;