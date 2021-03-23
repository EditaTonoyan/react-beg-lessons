import './App.css';
import{Route,Redirect,Switch} from 'react-router-dom';
import React from 'react'
import Todo from  './components/Pages/todo/Todo';
import Contact from './components/Pages/Contact';
import AboutUs from './components/Pages/AboutUs';
import Navbar from './components/Navbar/Navbar';
const router = [
  { 
    path: "/",
    component : Todo,
    exact: true
  },
  {
    path: "/contact",
    component: Contact,
    exact: true
  },
  {
    path: "/about_us",
    component:AboutUs,
    exact: true
  }
]
export default function App() {

 const pages = router.map((page,index)=>{
  return (
            <Route
              key = {index}
              path={page.path}
              component = {page.component}
              exact={page.exact}
            />
 

  )
})
  return (
  
    <div className="container">
            <Navbar/>
            <Switch>
               {pages}
               <Redirect to="/"/>
            </Switch>

    </div>

  )

  
}
 



