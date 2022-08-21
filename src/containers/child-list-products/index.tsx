import React from "react";
import Desktop from "./desktop";
import Mobile from "./mobile";

interface IProps {
    isMobile: boolean;
    [x: string]: any;
}

export default function ChildListProducts({isMobile,...props}: IProps){
    if(isMobile){
        return <Mobile {...props} />
    }
    return <Desktop {...props} />
}