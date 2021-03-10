import './App.css';
import React from 'react'
import Todo from  './components/todo/Todo';

// import './Function.js'
// import HocContainer from './DEMO/HOC'


export default function App() {
  return (
    <div className="container">
        {/* <Navbar /> */}
        <Todo />
       {/* <HocContainer>
         <div>
           <p>ppp</p>
         <span>sss</span>
         </div>
         
       </HocContainer> */}
    </div>
  )
}

