import React, {useState} from 'react';
import classes from './topbar.module.css';
import {
    Person,
    Message,
    Close,
    MoreHoriz,
    Notifications,
    Search,
    RssFeed,
    Chat,
    PlayCircle,
    Group, Bookmark, HelpOutline, Work, Event, School
} from '@mui/icons-material';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {setUser} from "../../store/userSlice";
import {setSearch} from "../../store/searchSlice";
import Sidebar from "../sidebar/sidebar";

const Topbar = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [rightBar, setRightBar] = useState(false);
    const [list, setList] = useState(false);

    const handleLogout = () => {
        axios({
            url: 'http://localhost:8080/api/auth/logout',
            withCredentials: true,
            method: 'get'
        }).then(
            () => {
                dispatch(setUser(false));
                navigate('/')
            }
        ).catch(e => console.log(e))
    }

    const handleSearch = (e) => {
        dispatch(setSearch(e.target.value))
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.container}>
                <div className={classes.responsiveMenu}>
                    <span onClick={()=>{setList(!list);setRightBar(false)}}>Menu</span>
                </div>
                <div className={!list?classes.listClose: classes.list} onClick={()=>{alert('function to be developed~')}}>
                    <span>Feed</span>
                    <span>Chats</span>
                    <span>Videos</span>
                    <span>Groups</span>
                    <span>Bookmarks</span>
                    <span>Questions</span>
                    <span>Jobs</span>
                    <span>Events</span>
                    <span>Jobs</span>
                </div>
                <Link to="/home" className={classes.logo}>
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
                <div className={classes.rightBarIcon} onClick={() => {
                    setRightBar(!rightBar);
                    setList(false)
                }}>
                    {rightBar ? <Close/> : <MoreHoriz/>}
                </div>
                <div className={rightBar ? classes.topBarRightClose : classes.topBarRight}>
                    <Link to={'/home'} className={classes.homepage}>Home</Link>
                    {
                        user.user ?
                            <div className={classes.icon}>
                                <div className={classes.name}>{user.user.username}</div>
                                <div className={classes.logout} onClick={handleLogout}>
                                    Logout
                                </div>
                            </div>
                            :
                            <div className={classes.loginBtn}>
                                <Link to='/' className={classes.loginBtnIcon}>Login</Link>
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