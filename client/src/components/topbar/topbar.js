import React, {useState} from 'react';
import classes from './topbar.module.css';
import {Person, Message, Notifications, Search} from '@mui/icons-material';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {setUser} from "../../store/userSlice";
import {setSearch} from "../../store/searchSlice";

const Topbar = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        axios({
            url: 'http://localhost:8080/api/auth/logout',
            withCredentials: true,
            method: 'get'
        }).then(
            () => {
                dispatch(setUser(false));
                navigate('/login')
            }
        ).catch(e => console.log(e))
    }

    const handleSearch = (e) => {
        dispatch(setSearch(e.target.value))
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.container}>
                <Link to="/" className={classes.logo}>
                    <span>
                    Ethan-Facebook
                    </span>
                </Link>
                <div className={classes.searchBar}>
                    <Link className={classes.searchBarLink} to='/search'>
                        <Search className={classes.searchIcon}/>
                    </Link>
                    <input type="text" onChange={handleSearch} placeholder="Search for friends"/>
                </div>
                <div className={classes.topBarRight}>
                    {/*<div className={classes.HT}>*/}
                    {/*    <span>Homepage</span>*/}
                    {/*    <span>Timeline</span>*/}
                    {/*</div>*/}
                    <Link to={'/'} className={classes.homepage}>Home</Link>
                    {
                        user.user ?
                            <div className={classes.icon}>
                                <div className={classes.name}>{user.user.username}</div>
                                {/*<div className={classes.iconItem}>*/}
                                {/*    <Person></Person>*/}
                                {/*    <span>1</span>*/}
                                {/*</div>*/}
                                {/*<div className={classes.iconItem}>*/}
                                {/*    <Message></Message>*/}
                                {/*    <span>1</span>*/}
                                {/*</div>*/}
                                {/*<div className={classes.iconItem}>*/}
                                {/*    <Notifications></Notifications>*/}
                                {/*    <span>1</span>*/}
                                {/*</div>*/}
                                <div className={classes.logout} onClick={handleLogout}>
                                    Logout
                                </div>
                            </div>
                            :
                            <div className={classes.loginBtn}>
                                <Link to='/login' className={classes.loginBtnIcon}>Login</Link>
                                <Link to='/signup' className={classes.loginBtnIcon}>Register</Link>
                            </div>
                    }

                    <div className={classes.profile}>
                        <img src="/profiles/cat1.jpg" alt=""/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Topbar;