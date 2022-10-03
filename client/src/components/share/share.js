import React, {useEffect, useState} from 'react';
import classes from './share.module.css';
import {InsertPhoto, Label, LocationOn, Mood} from '@mui/icons-material';
import axios from "axios";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";

const Share = () => {

    const user = useSelector(state=> state.user)
    const [share, setShare] = useState({id:user.user._id,desc:''});
    const handleChange = (e) => {
        setShare({...share, desc: e.target.value});
    }
    const handleShare = () => {
        // console.log(share);
        axios({
            url:`${process.env.REACT_APP_ADDRESS}/api/post`,
            method:'post',
            data:share,
            withCredentials:true
        }).then(res=> {
            // console.log(res);
            window.location.reload();
        })
            .catch(e=> console.log(e))
    }
    const handleClick = () => {
        alert('I am still learning Amazon S3~')
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.container}>
                <div className={classes.firstLayer}>
                    <img src="/profiles/cat1.jpg" alt=""/>
                    <input onChange={handleChange} type="text" placeholder="What's in your mind?"/>
                </div>
                <hr className={classes.hr}/>
                <div className={classes.secondLayer}>
                    <div className={classes.icon} onClick={handleClick}>
                        <div className={classes.iconItem}>
                            <InsertPhoto className={classes.photo}/>
                            <span>Photo or Video</span>
                        </div>
                        <div className={classes.iconItem}>
                            <Label className={classes.tag}/>
                            <span>Tag</span>
                        </div>
                        <div className={classes.iconItem}>
                            <LocationOn className={classes.location}/>
                            <span>Location</span>
                        </div>
                        <div className={classes.iconItem}>
                            <Mood className={classes.feeling}/>
                            <span>Feeling</span>
                        </div>
                    </div>
                    <button onClick={handleShare}>Share</button>
                </div>
            </div>
        </div>
    );
};

export default Share;