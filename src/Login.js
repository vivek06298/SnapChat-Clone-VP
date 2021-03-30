import { Button } from '@material-ui/core';
import React from 'react';
import './Login.css';
import {useDispatch} from 'react-redux';
import {auth,provider} from './firebase';
import { login } from './features/appSlice.js';


function Login() {
    const dispatch = useDispatch();
    const signin = () => {
        auth.signInWithPopup(provider)
        .then(result =>{
            dispatch(login({
                username: result.user.displayName,
                profilePic: result.user.photoURL,
                id: result.user.uid,
            })
        ); 
        }).catch(error => alert(error.message));
    };
    return (
        <div className='login'>
            <div className='login_container'>
                <img src='https://media.wired.com/photos/5927429aaf95806129f52116/master/w_2560%2Cc_limit/snapchat-logo-s.jpg' alt='' />
                <Button 
                    variant='outlined'
                    onClick={signin}
                > SIGN IN </Button>
            </div>
        </div>
    )
}

export default Login
