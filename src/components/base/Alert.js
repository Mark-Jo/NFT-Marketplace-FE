import React, { useState } from "react";
import "../../styles/base/Alert.css";

const Alert = ({alert,word}) => {
    const [isHover, setHover] = useState(false);

    return (
        <div style={{display:''}} className="alert">
            <dialog className="closebtn" onClick="this.parentElement.style.display='none';">&times;</dialog>
            {word}
        </div>
    );
};

export default Alert;
