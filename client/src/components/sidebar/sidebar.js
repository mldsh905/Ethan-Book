import React from 'react';
import classes from './sidebar.module.css';
import {RssFeed, Chat, PlayCircle, Group, Bookmark, HelpOutline, Work, Event, School} from '@mui/icons-material';

const Sidebar = () => {
    const handleClick = () => {
        alert('function to be developed~')
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.container}>
                <ul className={classes.list} onClick={handleClick}>
                    <li className={classes.listItem}>
                        <RssFeed/>
                        <span>Feed</span>
                    </li>
                    <li className={classes.listItem}>
                        <Chat/>
                        <span>Chats</span>
                    </li>
                    <li className={classes.listItem}>
                        <PlayCircle/>
                        <span>Videos</span>
                    </li>
                    <li className={classes.listItem}>
                        <Group/>
                        <span>Groups</span>
                    </li>
                    <li className={classes.listItem}>
                        <Bookmark/>
                        <span>Bookmarks</span>
                    </li>
                    <li className={classes.listItem}>
                        <HelpOutline/>
                        <span>Questions</span>
                    </li>
                    <li className={classes.listItem}>
                        <Work/>
                        <span>Jobs</span>
                    </li>
                    <li className={classes.listItem}>
                        <Event/>
                        <span>Events</span>
                    </li>
                    <li className={classes.listItem}>
                        <School/>
                        <span>Jobs</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;