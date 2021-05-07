import React from 'react';
import styles from './aboutUs.module.css';
import linkdin from '../../../assets/icons/linkdin.png';
import gmail from '../../../assets/icons/gmail.png';
import git from '../../../assets/icons/git.png';
export default function AboutUs() {

    return (
        <div style={{backgroundColor:'rgba(225,255,255, .9)'}}>
        <div >
            <p className={styles.name}>Edita Tonoyan</p>
            <p className={styles.professinon}>React developer</p>
            <div>
            <a 
                href="https://www.linkedin.com/in/edita-tonoyan-a081b4211/?fbclid=IwAR0vTyEUXb2ov4zqLSdZCrv-cvDF4hDq7tfrY87K2SkRiD_Xp4AHWBdTwXA"
            >
                 <img src={linkdin} alt="linkedin" 
                     style={{width:'30px'}}
                 />
            </a>

            <a 
                href="https://github.com/EditaTonoyan"
            >
                 <img src={git} alt="gitHub" 
                     style={{width:'30px'}}
                 />
            </a>
            
        </div>
            <div style={{textAlign:'center'}}>
                <p>Address:Armenia, Yerevan</p>
                <p>Phone:+374-99-044-772</p>
                <p>Date of birth : 02.07.1996</p>
            </div>
            
            <hr></hr>
           
        </div>
      
      
        <div>
            <p style={{
                textAlign:'center',
                fontWeight: 'bold',
                marginTop:'20px'}}>
                    ABOUT ME
            </p>
            <p className={styles.text}>
            I am React developer.  I am seeking
            <br/>
            employment that will make best use of my skills and
            <br/>

            allow me to develop them further. I am determined
            <br/>

            and enthusiastic and am confident working
            <br/>

            independently or as part of a team
            </p>
            <hr></hr>
        </div>
        <div style={{display:'flex'}}>
        <div style={{ width:"50%", borderRight:'2px solid rgba(153, 144, 144,.8)', display:'inline-block'}}>
            <p style={{
                textAlign:'center',
                fontWeight: 'bold',
                marginTop:'20px',
               
                }}>Techlical Skills
            </p>
            <ul className={styles.ul}>
                <li>JavaScript</li>
                <li>ReactJS</li>
                <li>HTML5, CSS-3</li>
                <li>PHP</li>
                <li>MySql</li>

            </ul>
            
            </div>


            <div style={{width:"50%",display:'inline-block'}}>
                <p style={{
                    textAlign:'center',
                    fontWeight: 'bold',
                    marginTop:'20px'}}>
                        Languages
                </p>

                <ul className={styles.ul}>
                    <li>Armenian    Native</li>
                    <li>English     Upper-intermediate</li>
                    <li>Russian     Fluent</li>
                </ul>
            
            </div>
        </div>
        <hr></hr>

        <div >
            <p style={{
                textAlign:'center',
                fontWeight: 'bold',
                marginTop:'20px',
               
                }}
            >
                Work Experinece
            </p>
        <div style={{ 
                    width:"50%",
                    borderRight:'2px solid rgba(153, 144, 144,.8)', 
                    display:'inline-block', 
                    textAlign:'center',
                    marginTop:'20px'}}>
            
            <p >
                Yerevan
            </p>

             <br/>

             <p>
             2018-2019
             </p>
        </div>

        <div style={{width:"50%",display:'inline-block'}}> 
            <p style={{
            textAlign:'center',
            fontWeight: 'bold',
            marginTop:'20px',
            }}>
                IT Specialis
            </p>
            <br/>
            <p
                style={{
                textAlign:'center',
                }}
            >
            Brusov State University
            </p>
        </div>

        <div style={{ 
                    width:"50%",
                    borderRight:'2px solid rgba(153, 144, 144,.8)', 
                    display:'inline-block', 
                    textAlign:'center',
                    marginTop:'20px'}}>
            <p>
                Yerevan
            </p>

             <br/>

             <p>
                2019-2020
             </p>
        </div>

        <div style={{width:"50%",display:'inline-block'}}> 
            <p style={{
            textAlign:'center',
            fontWeight: 'bold',
            marginTop:'20px',
            }}>
                Back-End Developer
            </p>
            <br/>
            <p
                style={{
                textAlign:'center',
                }}
            >
                Avromic LLC
            </p>
        </div>            
        </div>
        <div>
            <p style={{
                textAlign:'center',
                fontWeight: 'bold',
                marginTop:'20px',
            }}
            >
                Education
            </p>
            
        <div style={{ 
                    width:"50%",
                    borderRight:'2px solid rgba(153, 144, 144,.8)', 
                    display:'inline-block', 
                    textAlign:'center',
                    marginTop:'20px'}}>
            <p>
                Yerevan
            </p>

             <br/>

             <p>
                2014-2018
             </p>
        </div>

        <div style={{width:"50%",display:'inline-block'}}> 
            <p style={{
            textAlign:'center',
            fontWeight: 'bold',
            marginTop:'20px',
            }}>
               Bacalar
            </p>
            <br/>
            <p
                style={{
                textAlign:'center',
                }}
            >
                Yerevan State University
            </p>
        </div>
        </div>
        <br/>
        <br/>
        <br/>
        </div>
    )
}
