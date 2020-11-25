import React from 'react';


const FaceRecognition = ({imageURL}) =>{
    return(
        <div style={{display: "flex", justifyContent: 'center'}}>
            <div className="absolute mt2">
                <img 
                alt="" 
                src={imageURL}
                width='600px'
                height='auto'
                />
            </div>
        </div>
    )
}

export default FaceRecognition;