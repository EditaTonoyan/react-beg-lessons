import './App.css';
import{Route,Redirect,Switch} from 'react-router-dom';
import {useEffect} from 'react'
import Navbar from './components/Navbar/Navbar';
import Example from './components/ContactForm/ContactFormWithHooks';
import {connect} from 'react-redux';
import {ToastContainer, toast} from 'react-toastify';

// PAGES
import Todo from  './components/Pages/todo/Todo';
import Contact from './components/Pages/Contact/Contact';
import AboutUs from './components/Pages/AboutUs/AboutUs';
import NotFound from './components/Pages/NotFoundPage/NotFound';
//HOOKS
// import SingleTask from './components/Pages/SingleTaskPage/SingleTask'
import SingleTaskContextProvider from './components/context/Providers/SingleTaskContextProvider';
import SingleTaskForContext from './components/Pages/SingleTaskPage/SingleTaskForContext';
import SingleTask from './components/Pages/SingleTaskPage/SingleTask';
import SingleTaskWithReducer from './components/Pages/SingleTaskPage/SingleTaskWithReducer';

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
  // {
  //   path: "/task/:id",
  //   component:SingleTaskWithReducer,
  //   exact: true
  // }, 
  // {
  //   path: "/task/:id",
  //   component:SingleTaskForContext,
  //   exact: true
  // },
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
 const App = (props) => {
   const {errorMessage, successMessage } = props;

   useEffect(() => {
    errorMessage && toast.error(`🦄 ${errorMessage}`, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
   }, [errorMessage])


   useEffect(() => {
    successMessage && toast.success(`🦄 ${successMessage}`, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
   }, [successMessage])
   

 const pages = router.map((page,index)=>{

  //  if(index === 3){
     
  // return(
  //    <Route
  //       key = {index}
  //       path={page.path}
  //       render  = { (props) => (
  //          <SingleTaskContextProvider  {...props}>
  //         < page.component {...props}/>
  //       </SingleTaskContextProvider>
  //       )
       
        
  //     }
  //     exact={page.exact}
  //   />
  // );
  //  }
      
           return(
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
           <ToastContainer/>

    </div>

  )

  
}
const mapToStateProps = (state) => ({
      errorMessage:state.globalState.errorMessage,
      successMessage:state.globalState.successMessage
})
export default connect (mapToStateProps, null)(App)


