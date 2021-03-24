import React from 'react';
import styles from './notFound.module.css';
import notFound from '../../../assets/images/notFound.jpg';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function NotFound() {
    return (
        <div>
            <h1 className={styles.heading1}>Page Not Found</h1>
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
                <img src={notFound} alt="" />
            </div>
        </div>
    )
}
