import React , {useEffect} from 'react';
import { Route } from 'react-router';
import './App.css';
import WebcamCapture from './WebcamCapture';
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import Preview from "./Preview";
import Chats from "./Chats";
import Login from './Login.js';
import Chatview from './Chatview.js';
import { login,logout,selectUser } from './features/appSlice.js';
import {useSelector,useDispatch} from 'react-redux';
import {auth} from './firebase';
function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if(authUser){
        dispatch(login({
          username: authUser.displayName,
          profilePic:authUser.photoURL,
          id:authUser.uid,
        }))
      }else{
        dispatch(logout());
      }
    })
  }, [])


  return (
    <div className="app">
          <Router>
            {!user ? (
              <Login />
            ) : (
              <>
              <img className="app_logo" src='https://media.wired.com/photos/5927429aaf95806129f52116/master/w_2560%2Cc_limit/snapchat-logo-s.jpg' alt=''/>
                <div className="app__body">
                  <div className="app_bodybackground">
                    <Switch>
                    <Route  exact path="/chats" >
                      <Chats />
                      </Route>
                      <Route  exact path="/chats/view" >
                      <Chatview />
                      </Route>
                      <Route  exact path="/" >
                      <WebcamCapture />
                      </Route>
                      <Route path="/preview" >
                      <Preview />
                      </Route>
                    </Switch>
                  </div>
              </div> 
            </>
            )}
          
        </Router>
    </div>
  );
}

export default App;
