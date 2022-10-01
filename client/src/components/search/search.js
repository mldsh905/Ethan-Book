import React, {useEffect, useState} from 'react';
import Topbar from "../topbar/topbar";
import Sidebar from "../sidebar/sidebar";
import classes from "./search.module.css";
import axios from "axios";
import {useSelector} from "react-redux";
import {Link, useLocation} from "react-router-dom";

const Search = () => {
    const user = useSelector(state=>state.user);
    const search = useSelector(state=> state.search)
    const [list, setList] = useState([]);

    useEffect(()=>{
        const fetchUser = () => {
            axios({
                url: 'http://localhost:8080/api/user/find/people',
                withCredentials:true,
                data:{id: user.user._id, key:search.search},
                method: 'post'
            }).then(res=>{
                setList(res.data)
                // console.log(res.data);
            }).catch(e=> console.log(e))
        }
        fetchUser();
    },[search])
    // console.log(search);
    return (
        <div>
            <Topbar/>
            <div className={classes.container}>
                <Sidebar/>
                <div className={classes.list}>
                    {list.map(e=>{
                        return (
                            <Link className={classes.item} to={`/profile/${e._id}`} key={e._id}>{e.username}</Link>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default Search;