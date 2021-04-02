import './App.css';
import{Route,Redirect,Switch} from 'react-router-dom';
import React from 'react'
import Navbar from './components/Navbar/Navbar';
// PAGES
import Todo from  './components/Pages/todo/Todo';
import Contact from './components/Pages/Contact/Contact';
import AboutUs from './components/Pages/AboutUs/AboutUs';
import NotFound from './components/Pages/NotFoundPage/NotFound';
import SingleTask from './components/Pages/SingleTaskPage/SingleTask';

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
  },
  {
    path: "/task/:id",
    component:SingleTask,
    exact: true
  },
  {
    path: "/error/:status",
    component:NotFound,
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
               <Redirect to="/error/404"/>
            </Switch>

    </div>

  )

  
}
 



