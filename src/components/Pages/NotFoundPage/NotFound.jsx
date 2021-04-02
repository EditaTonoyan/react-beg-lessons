import React from 'react';
import styles from './notFound.module.css';
import notFound from '../../../assets/images/notFound.jpg';
import error from '../../../assets/images/error.jpg'
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';


export default function NotFound(props) { 
    const {status} = props.match.params
    const errorMessage = 
        status === "404" ? "Error 404" :
        status === "500" ? "Error 500" :
                    "Error";
      const image = status === "404" ? notFound : error
    return (
        <div>
            <h1 className={styles.heading1}>{errorMessage}</h1>
            <div>
               <Link to="/">
                    <Button  
                         className={styles.button4} 
                         style={{ marginLeft: "500px" }}
                    >
                        Go Back Home
                    </Button>
               </Link>
            </div>
            <div className={styles.notFoundImage}>
                <img src= {image} alt="" />:
            </div>
        </div>
    )
}
