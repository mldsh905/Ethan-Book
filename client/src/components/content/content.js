import React, {useEffect, useState} from 'react';
import classes from './content.module.css';
import Share from "../share/share";
import Post from "../post/post";
import axios from "axios";
import {format} from "timeago.js";
import {useSelector} from "react-redux";

const Content = () => {
    const [post, setPost] = useState([]);
    const user = useSelector(state=>state.user);

    useEffect(()=>{
        const fetchPost = () => {
            axios.get(`http://localhost:8080/api/post/get/allPosts/${user.user._id}`,{withCredentials:true})
                .then(
                    res => {
                        setPost(res.data.sort((b,a)=>{
                            return(new Date(a.createdAt)  - new Date(b.createdAt) )
                        }));
                    }
                ).catch(
                e => console.log(e)
            )
        }
        fetchPost();
    },[]);

    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <Share/>
                {post.map(e=>{
                    return <Post key={e._id} props={e}/>
                })}
            </div>
        </div>
    );
};

export default Content;