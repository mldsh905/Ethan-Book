import React, {useEffect} from 'react';
import classes from './home.module.css';
import Topbar from "../../components/topbar/topbar";
import Sidebar from "../../components/sidebar/sidebar";
import Content from "../../components/content/content";
import Rightbar from "../../components/rightbar/rightbar";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const user = useSelector(state=>state.user);
    const navigate = useNavigate();

    useEffect(()=>{
        if (!user.user){
            navigate('/')
        }
    },[user])

        return (
            <div>
                <Topbar/>
                <div className={classes.container}>
                    <Sidebar/>
                    <Content/>
                    <Rightbar/>
                </div>
            </div>
        );
};

export default Home;