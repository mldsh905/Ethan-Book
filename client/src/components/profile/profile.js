import React, {useEffect, useState} from 'react';
import Topbar from "../topbar/topbar";
import Sidebar from "../sidebar/sidebar";
import classes from './profile.module.css';
import {useLocation, useParams} from "react-router-dom";
import axios from "axios";
import Post from "../post/post";
import Rightbar from "../rightbar/rightbar";
import {useSelector} from "react-redux";

const Profile = () => {
    const {id} = useParams();
    const [post, setPost] = useState([]);
    const [user, setUser] = useState(false);
    const [follow, setFollow] = useState(false);
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        const fetchData = () => {
            axios.get(`${process.env.REACT_APP_ADDRESS}/api/post/get/posts/${id}`)
                .then(res => {
                    setPost(res.data);
                    setUser(true)
                })
                .catch(e => console.log(e))
        }
        const fetchUserInfo = () => {
            axios.get(`${process.env.REACT_APP_ADDRESS}/api/user/${id}`)
                .then(res => {
                    setUserInfo(res.data);
                    if (res.data.followers.includes(profile.user._id)) {
                        setFollow(true)
                    }else{
                        setFollow(false)
                    }
                    // console.log(res.data);
                }).catch(e => console.log(e))
        }
        fetchData();
        fetchUserInfo();
    }, [follow, id])



    const profile = useSelector(state=>state.user);
    const handleFollow = () => {
        axios({
            url:`${process.env.REACT_APP_ADDRESS}/api/user/${id}/follow`,
            method: 'put',
            withCredentials:true,
            data:{id:profile.user._id}
        }).then(
            res=>{
                setFollow(!follow)
                // console.log(res);
            }
        ).catch(e=> console.log(e))
    }

    if (!user) {
        return (
            <div key={id}>
                <Topbar/>
                <div className={classes.container}>
                    <Sidebar/>
                    <div className={classes.posts}>
                        Sorry, not find a user!
                    </div>
                    <Rightbar/>
                </div>
            </div>
        )
    } else {
        return (
            <div key={id}>
                <Topbar/>
                <div className={classes.container}>
                    <Sidebar/>
                    <div className={classes.posts}>
                        <div className={classes.data}>
                            <div className={classes.background}>
                                <img
                                    src={userInfo.coverPicture === "" ? "/posts/post1.jpg" : `/posts/${userInfo.coverPicture}.jpg`}
                                    alt="" className={classes.bgimg}/>
                                <img
                                    src={userInfo.profilePicture === "" ? "/profiles/dog1.jpg" : `/profiles/${userInfo.profilePicture}.jpg`}
                                    alt="" className={classes.profile}/>
                            </div>
                            <div className={classes.nameAndIntro}>
                                <span className={classes.name}>{userInfo.username}</span>
                                <button onClick={handleFollow}>{follow?'Followed ✓':'Follow'}</button>
                                <span className={classes.intro}>{userInfo.desc}</span>
                            </div>
                            <div className={classes.userInfo}>
                                <span>City: {userInfo.city}</span>
                                <span>Followings: {userInfo.followings?.length}</span>
                                <span>Followers: {userInfo.followers?.length}</span>
                            </div>
                        </div>
                        {post.map(e => {
                            return <Post key={e._id} props={e}/>
                        })}
                    </div>
                    <Rightbar/>
                </div>
            </div>
        );
    }
};

export default Profile;