import React, {useState} from "react";
import '../../styles/base/ImageBox.css';
import Image from "./Image";

const ImageBox=({src ,width, height})=>{
    return(
        <div style={{textAlign:"center",display:"inline-block"}} id="image-box-outside">
            {{src}&&<img style={{minHeight:490}} src={src}id="image-box"/> }

        </div>

    )
}
export default ImageBox;