import React, {useState} from 'react';
import classes from './login.module.css';
import axios from "axios";
import {setUser} from "../../store/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";


const Login = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [msg, setMsg] = useState('')
    const [login, setLogin] = useState({username: '', password: ''});
    const handleUsername = e => {
        setLogin({...login, username: e.target.value})
    }
    const handlePassword = e => {
        setLogin({...login, password: e.target.value})
    }
    const handleSubmit = () => {
        axios({
            url: `${process.env.REACT_APP_ADDRESS}/api/auth/login`,
            method: 'post',
            withCredentials: true,
            data: login
        }).then(res => {
            // console.log(res.data);
            dispatch(setUser(res.data));
            navigate('/home')
        }).catch(e => {
            setMsg(e.response.data);
        })
    }
    const handleGuest = () => {
        setMsg('log in, please wait... the backend is deployed on Render.com, you may wait up to 1-2mins for your first time login')
        axios({
            url: `${process.env.REACT_APP_ADDRESS}/api/auth/login`,
            method: 'post',
            withCredentials: true,
            data: {
                username: process.env.REACT_APP_USERNAME,
                password: process.env.REACT_APP_PASSWORD
            }
        }).then(res => {
            // console.log(res.data);
            dispatch(setUser(res.data));
            navigate('/home')
        }).catch(e => {
            setMsg(e.response.data);
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
                    <div className={classes.login1}>
                        <input type="text" placeholder="username" onChange={handleUsername}/>
                        <input type="password" placeholder="password" onChange={handlePassword}/>
                    </div>
                    <div className={classes.msg}>{msg}</div>
                    <div className={classes.login3}>
                        <button className={classes.loginbtn} onClick={handleSubmit}>Log In</button>
                        <button className={classes.forgot} onClick={()=>{alert('Please contact admin')}}>Forget Password?</button>
                        <button className={classes.newaccountbtn} onClick={handleGuest}>Use Guest Account
                        </button>
                        <button className={classes.newaccountbtn} onClick={() => {
                            navigate('/signup')
                        }}>Create a New Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;