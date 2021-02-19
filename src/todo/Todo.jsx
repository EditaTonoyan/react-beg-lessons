import React, { Component } from 'react';
import Addnewtask from '../components/Addnewtask';


export default class Todo extends Component {
    state = {
        inputValue:""
        
    }

    handleSubmit = (value) =>{
        console.log('value' ,value);
    }

    render() {

        return (
            <div>

                <Addnewtask handleSubmit={this.handleSubmit}/>

            </div>
        )
    }
}
