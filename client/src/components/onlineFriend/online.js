import React from 'react';
import classes from './online.module.css';

const Online = () => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.container}>
                <div className={classes.profile}>
                    <img src="/profiles/cat1.jpg" alt=""></img>
                    <div className={classes.dot}></div>
                </div>
                <span>Name</span>
            </div>
        </div>
    );
};

export default Online;