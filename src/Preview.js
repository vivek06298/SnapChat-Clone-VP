import React, {useEffect} from 'react'
import {useSelector} from 'react-redux';
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import {resetCameraImage, selectCameraImage} from "./features/cameraSlice";
import { selectUser } from './features/appSlice.js';
import "./Preview.css";
import CloseIcon from "@material-ui/icons/Close";
import TextFieldIcon from "@material-ui/icons/TextFields";
import CreateIcon from "@material-ui/icons/Create";
import NoteIcon from "@material-ui/icons/Note";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import TimerIcon from "@material-ui/icons/Timer";
import SendIcon from "@material-ui/icons/Send";
import {v4 as uuid} from "uuid";
import { db, storage} from "./firebase";
import firebase from "firebase";

function Preview() {

    const CameraImage = useSelector(selectCameraImage);
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    useEffect(() => {
       if(!CameraImage) {
            history.replace('/');
       }
    }, [CameraImage, history])

    const closePreview = () => {
        dispatch(resetCameraImage());
    };

    const sendpost = () => {
        console.log("BUtton clicked");
        const id = uuid();
        const uploadtask = storage.ref(`posts/${id}`).putString(CameraImage,'data_url'); 
        uploadtask.on('state_changed',null,
        (error) =>{console.log(error)}, 
        () => { storage.ref('posts').child(id).getDownloadURL().then((url)  =>  {
            db.collection('posts').add({
                imageUrl: url,
                username: user.username,
                read:false,
                profilePic: user.profilePic,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            history.replace('/chats');
        });
            }
        );
    };
    
    return (
        <div className="preview">
            <CloseIcon onClick={closePreview} className="preview__close"/>
            <div className="preview__toolbarright">
                <TextFieldIcon />
                <CreateIcon />
                <NoteIcon />
                <MusicNoteIcon />
                <TimerIcon />
            </div>
            <div  className="preview__footer">
                <h2>Send to </h2>
                <SendIcon onClick={sendpost} fontSize="small" className="preview__sendIcon" />
            </div>
          <img src={CameraImage} alt="" />
        </div>
    )
}

export default Preview
