import React, { Component } from 'react';
import styles from './singleTask.module.css';
import {Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';


const API_HOST = "http://localhost:3001";
export default class SingleTask extends Component {
    state = {
        singleTask:null
    }
    componentDidMount() {
        const {id} = this.props.match.params;
        fetch(`${API_HOST}/task/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    throw data.error;
                this.setState({
                    singleTask: data
                });
            })
            .catch(error => {
                console.log("Single task reques error ", error);
            });
    }

    deleteTask = () => {
        const {id} = this.props.match.params;
        fetch(`${API_HOST}/task/${id}`, {
            method:"DELETE"
        })
        .then(res => res.json())
        .then(data => {
            if(data.erros) throw data.error
            this.props.history.push("/");
        })
        .catch(error => {
            console.log("Delete task reques error", error)
        })
    }
  

    render() {
        if(this.state.singleTask == null) return <p>loadin...</p>
        return (
            <div>
                <h1 style={{color:'black'}}>Single Task Page</h1>
                <div className = {styles.singleTaskStyle}>
                    <p style={{textAlign:'center', fontSize:'25px', marginBottom:'10px'}}>Title:{this.state.singleTask.title}</p>
                    <p style={{textAlign:'center', fontSize:'25px'}}>Descriptions:{this.state.singleTask.description}</p>
                <div  style={{textAlign:'center', marginTop:'10px'}}> 
                <Button
                    variant="danger"
                    onClick={this.deleteTask}
                  
                >
                <FontAwesomeIcon icon={faTrash} />
                </Button>
                <Button
                    variant="warning"
                    className="ml-3"
                >
                <FontAwesomeIcon icon={faEdit} />
                </Button>
            </div>
                </div>

            
              
            </div>
        )
    }
}
