import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageURL, box}) =>{
    return(
        <div style={{display: "flex", justifyContent: 'center'}}>
            <div className="absolute mt2">
                <img alt="" src={imageURL} width='600px' height='auto' id='inputImage'/>
                <div className="bounding-box" style={{top: box.topRow, bottom: box.bottomRow, left:box.leftCol, right:box.rightCol}}></div>
            </div>
        </div>
    )
}

export default FaceRecognition;