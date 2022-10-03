import React, {useEffect, useState} from 'react';
import classes from './post.module.css';
import {MoreHoriz, Recommend} from '@mui/icons-material';
import axios from "axios";
import {format} from "timeago.js";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {nanoid} from "nanoid";

const Post = (props) => {
    // console.log(props.props);
    const [postUser, setPostUser] = useState({});
    const [recommend, setRecommend] = useState(props.props.likes.length);
    const [like, setLike] = useState(false);
    const [comment, setComment] = useState('');

    const user = useSelector(state => state.user);
    // console.log(user.user);
    useEffect(() => {
        const fetchUser = () => {
            axios.get(`${process.env.REACT_APP_ADDRESS}/api/user/${props.props.id}`)
                .then(res => {
                    setPostUser(res.data);
                }).catch(e => console.log(e))
        }

        const fetchPost = () => {
            axios({
                url: `${process.env.REACT_APP_ADDRESS}/api/post/${props.props._id}`,
                method: 'get',
                withCredentials: true
            }).then(res => {
                if (res.data.likes.includes(user.user._id)) {
                    setLike(true)
                } else {
                    setLike(false)
                }
            }).catch(e => console.log(e))
        }
        fetchPost();
        fetchUser();
    }, [])

    const handleComment = (e) => {
        setComment(e.target.value)
    }
    const submitComment = () => {
        if (comment !== ''){
            axios({
                url: `${process.env.REACT_APP_ADDRESS}/api/post/${props.props._id}/comment`,
                method: 'put',
                withCredentials: true,
                data:{id:nanoid(), userId: user.user._id, username: user.user.username, desc: comment}
            }).then(res=>{
                window.location.reload();
            }).catch(e=>{
                console.log(e);})
        }
    }
    const handleRecommend = () => {
        axios({
            url: `${process.env.REACT_APP_ADDRESS}/api/post/${props.props._id}/like`,
            method: 'put',
            withCredentials: true,
            data: {id: user.user._id}
        }).then(res => {
            if (!like) {
                setRecommend(recommend + 1);
                setLike(true);
            } else {
                setRecommend(recommend - 1);
                setLike(false);
            }
        }).catch(e => console.log(e))
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.container}>
                <div className={classes.top}>
                    <div className={classes.info}>
                        {/*<img src={`/profiles/${user.profilePicture}.jpg`} alt=""/>*/}
                        <Link className={classes.info} to={`/profile/${postUser._id}`}>
                            <img
                                src={postUser.profilePicture ? '/profiles/' + postUser.profilePicture + '.jpg' : '/profiles/cat1.jpg'}
                                alt="profile pic"/>
                            <span className={classes.username}>{postUser.username}</span>
                            <span className={classes.time}>{format(props.props.createdAt)}</span>
                        </Link>
                    </div>
                    <MoreHoriz className={classes.more}/>
                </div>
                <div className={classes.content}>
                    <span>{props.props.desc}</span>
                    {props.props.img === ''
                        ? <></>
                        : <img src={'/posts/' + props.props.img + '.jpg'} alt=""/>}
                </div>
                <div className={classes.bottom}>
                    <div className={classes.recommend}>
                        <span className={classes.recommendIcon} onClick={handleRecommend}>
                        <Recommend className={like ? classes.like : classes.dislike}/>
                        </span>
                        <span>{recommend} people like it</span>
                    </div>
                    <span className={classes.comment}>{props.props.comments.length} comments</span>
                </div>
                <hr/>
                <div className={classes.comment}>
                    {props.props.comments.map(e => {
                        // console.log(e);
                        return (
                            <div className={classes.commentItem} key={e.id}>
                                <Link to={`/profile/${e.userId}`} className={classes.name}>{e.username + ': '}</Link>
                                <span>{e.desc}</span>
                            </div>
                        )
                    })}
                </div>
                {user.user?
                    <>
                        <hr/>
                        <div className={classes.post}>
                            <input type="text" placeholder='Share your comment' onChange={handleComment}/>
                            <button onClick={submitComment}>Post</button>
                        </div>
                    </>
                    :<></>
                }
            </div>
        </div>
    );
};

export default Post;