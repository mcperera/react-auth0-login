import React, { Component } from 'react';

class Main extends Component{
    render(){
        return(
            <div>
                <h3> Home Page </h3>
                <h4> Hello, {this.props.name} </h4>
                <p> Do you want to see the secret page? <a href="/secret" >Click Me!</a> </p>
                {!this.props.auth.isAuthenticated() &&
                    <div>
                        <hr />
                        Please login first
                        <hr /> 
                        <button onClick={this.props.auth.login} >Login</button>
                    </div>
                }
            </div>
        );
    }
}

export default Main;