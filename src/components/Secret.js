import React, { Component } from 'react';

class Secret extends Component{
    render(){
        return(
            <div>
                <h3>Super Secret Page!</h3>
                <h3>Welcome {this.props.name}</h3>
                <hr />
                <p>Jump Back to <a href="/" >Home</a></p>
                <br />
                <button onClick={this.props.auth.logout} >Logout</button>
            </div>
        );
    }
}

export default Secret;