import React, {useRef,useCallback} from 'react';
import Webcam from 'react-webcam';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'; 
import { setCameraImage } from "./features/cameraSlice";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import './WebcamCapture.css';
const videoConstraints = {
    height : 400,
    width : 250,
    facingMode : 'user',
};

function WebcamCapture() {
    const WebcamRef = useRef(null);
    const dispatch = useDispatch();
    const history = useHistory();

    const capture = useCallback(() => {
        const imageSrc = WebcamRef.current.getScreenshot();
        dispatch(setCameraImage(imageSrc));
        history.push('/Preview');     
    }, [WebcamRef]);

    return ( <div className="webcamCapture"> 
            <Webcam className="webcam"
                audio={false}
                height={videoConstraints.height}
                ref={WebcamRef}
                screenshotFormat="image/jpeg"
                width={videoConstraints.width}
                videoConstraints={videoConstraints}            
            />

            <RadioButtonUncheckedIcon
                className="webcamCapture__button"
                onClick={capture}
                fontSize="large"
            />
          
    </div>
    );
}

export default WebcamCapture;
