import React from "react";
import "./loader.css";
import { TailSpin } from "react-loader-spinner";
const LoaderComp = () => {
    return (
        <div className="loader-container"> 
        <TailSpin
            height="100"
            width="100"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
        </div>
    );
};  
export default LoaderComp;