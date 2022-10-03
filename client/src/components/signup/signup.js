import React, {useState} from 'react';
import classes from "../signup/signup.module.css";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();

    const [info, setInfo] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    })
    const [msg, setMsg] = useState('')

    const handleEmailChange = e => {
        setInfo({...info, email: e.target.value});
    }
    const handleUsernameChange = e => {
        setInfo({...info, username: e.target.value});
    }
    const handlePasswordChange = e => {
        setInfo({...info, password: e.target.value});
    }
    const handleConfirmPasswordChange = e => {
        setInfo({...info, confirmPassword: e.target.value});
    }
    const handleSubmit = () => {
        if (info.confirmPassword !== info.password) return alert('password is not same!');
        axios({
            url: `${process.env.REACT_APP_ADDRESS}/api/auth/register`,
            method: 'post',
            withCredentials: true,
            data: info
        }).then(
            res => {
                navigate('/')
            }
        ).catch(e => {
            // setMsg(e.response.data.message)
            console.log(e);
            alert(e.response.data.message)
        })
    }


    return (
        <div className={classes.wrapper}>
            <div className={classes.container}>
                <div className={classes.intro}>
                    <span className={classes.title}>Ethan - Facebook</span>
                    <span className={classes.text}>Connect with friends and the world around you</span>
                </div>
                <div className={classes.login}>
                    <input type="text" onChange={handleEmailChange} placeholder="email"/>
                    <input type="text" onChange={handleUsernameChange} placeholder="username"/>
                    <input type="password" onChange={handlePasswordChange} placeholder="password"/>
                    <input type="password" onChange={handleConfirmPasswordChange} placeholder="confirm password"/>
                    <button className={classes.loginbtn} onClick={()=>navigate('/')}>Already have an account? Login</button>
                    <button className={classes.newaccountbtn} onClick={handleSubmit}>Create a New Account</button>
                </div>
            </div>
        </div>
    );
};

export default Signup;