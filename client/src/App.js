import React, { useState, useEffect } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Product from './components/Product';
import F0 from './components/F0';
import Menu from './components/Menu';
import Doctor from './components/Doctor';
import Exam from "./components/Exam";
import Volunteer from "./components/Volunteer";
import User from "./components/User";
import Church from "./components/Church";
import Lecture from "./components/Lecture";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Getpwd from "./components/Getpwd";
import Resetpwdform from "./components/Resetpwdform";



function App() {

  const [showLogin, setShowLogin] = useState(false)

  useEffect(() => {
    document.title = "Home-base Care Program"
    if (sessionStorage.getItem('token') === null || sessionStorage.getItem('token') === ""){
       setShowLogin(true)
    }
  }, []);

  return (
    <div class="container">
      <Menu />
      {showLogin? 
      <Login /> : 
    
        <Router >
          <div>   
         
            <Switch>
           
              <Route exact path="/">
              </Route>
              <Route path="/about">
              </Route>
              <Route path="/f0">
                <F0 />
              </Route>
              <Route path="/product">
                <Product />
              </Route>
              <Route path="/doctor">
                <Doctor />
              </Route>
              <Route path="/exam/:f0">
                <Exam />
              </Route>
              <Route path="/volunteer">
                <Volunteer />
              </Route>
              <Route path="/user">
                <User />
              </Route>
              <Route path="/church">
                <Church />
              </Route>
              <Route path="/lecture">
                <Lecture />
              </Route >

            </Switch>
          </div>
        </Router>
      }
      
         <Router>
         <Route path="/resetpwdform">
            <Resetpwdform />
          </Route>
       
        
         
</Router>
      {/* <div>
        <Router>
          <Switch>
        <Route path="/login">
                <Login />
              </Route >
          <Route path="/signup">
            <Signup />
          </Route>  
          <Route path="/getpwd">
            <Getpwd />
          </Route>
          </Switch>
        </Router>
        
      </div> */}
    </div>


  );
}

export default App;

