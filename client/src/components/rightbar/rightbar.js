import React, {useEffect, useState} from 'react';
import classes from './rightbar.module.css';
import Online from "../onlineFriend/online";
import axios from "axios";
import {useSelector} from "react-redux";
import {Link} from 'react-router-dom';

const Rightbar = () => {
    const user = useSelector(state => state.user);
    const [friends, setFriends] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [followings, setFollowings] = useState([]);
    useEffect(() => {
        const fetchFriends = () => {
            axios({
                url: `${process.env.REACT_APP_ADDRESS}/api/user/find/friends`,
                method: 'post',
                withCredentials: true,
                data: {id: user.user._id}
            }).then(res => {
                setFriends(res.data);
                // console.log("friend---", res);
            }).catch(e => console.log(e))
        }
        const fetchFollowers = () => {
            axios({
                url: `${process.env.REACT_APP_ADDRESS}/api/user/find/followers`,
                method: 'post',
                withCredentials: true,
                data: {id: user.user._id}
            }).then(res => {
                setFollowers(res.data);
                // console.log("followers---", res);
            }).catch(e => console.log(e))
        }
        const fetchFollowings = () => {
            axios({
                url: `${process.env.REACT_APP_ADDRESS}/api/user/find/followings`,
                method: 'post',
                withCredentials: true,
                data: {id: user.user._id}
            }).then(res => {
                setFollowings(res.data);
                // console.log("following---", res);
            }).catch(e => console.log(e))
        }
        fetchFriends();
        fetchFollowers();
        fetchFollowings();
    }, [])

    return (
        <div className={classes.wrapper}>
            <div className={classes.container}>
                {/*<span className={classes.title}>Online friends</span>*/}
                {/*<hr/>*/}
                {/*<Online/>*/}
                {/*<Online/>*/}
                {/*<hr/>*/}
                <div className={classes.title}>New friends</div>
                <hr/>
                <ul>
                    {friends.map(e => {
                        return (
                            <li key={e._id}>
                                <Link className={classes.person} to={`/profile/${e._id}`}>
                                    {e.username}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
                <hr/>
                <div className={classes.title}>Followings</div>
                <ul>
                    {followings.map(e => {
                        return (
                            <li key={e._id}>
                                <Link className={classes.person} to={`/profile/${e._id}`}>
                                    {e.username}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
                <hr/>
                <div className={classes.title}>Followers</div>
                <ul>
                    {followers.map(e => {
                        return (
                            <li key={e._id}>
                                <Link className={classes.person} to={`/profile/${e._id}`}>
                                    {e.username}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Rightbar;