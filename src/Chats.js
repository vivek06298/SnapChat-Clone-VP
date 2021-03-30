import { Avatar } from '@material-ui/core';
import  SearchIcon  from '@material-ui/icons/Search';
import  ChatBubbleIcon  from '@material-ui/icons/ChatBubble';
import Chat from './Chat.js';
import React,{useState,useEffect} from 'react';
import { db} from "./firebase";
import './Chats.css';
import {useSelector,useDispatch} from 'react-redux';
import { selectUser } from './features/appSlice.js';
import {auth} from './firebase';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'; 
import {useHistory}  from 'react-router-dom';
import { resetCameraImage } from './features/cameraSlice.js';




function Chats() {

    const [posts,setposts] = useState([]);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const history = useHistory();
    
    const takesnap = () => {
        dispatch(resetCameraImage());
        history.push('/');        
    };

    
    useEffect(() => {
        db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot=>
            setposts(snapshot.docs.map(doc=>({
            id: doc.id,
            data: doc.data(),  
            }))
            )
        ); 
    }, []);

    return (
        <div className="chats">
           <div className="chats_header">
                <Avatar src={user.profilePic} onClick={() => auth.signOut()} className='chats_avatar' />
                <div className="chats_search">
                    <SearchIcon className="chats_searchicon"/>
                    <input placeholder='Friends' type='text' />
                </div>
                <ChatBubbleIcon className="chats_chaticon" />
            </div>

            <div className="chats_posts">
                {posts.map(({
                    id,
                    data: { profilePic,username,timestamp,imageUrl,read },
                })  => (
                    <Chat 
                        key={id}
                        id={id}
                        username={username}
                        timestamp={timestamp}
                        imageUrl={imageUrl}
                        read={read}
                        profilePic={profilePic}
                    />
                ))}
            </div>
        
        <RadioButtonUncheckedIcon
            className="chats_takepicicon"
            onClick={takesnap}
            fontSize="large"
         />

        
        </div>
    );
}

export default Chats

