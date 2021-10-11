import React, { useState } from 'react'

interface TopData {
    list: string[];
}


const MultimediaBottomDataLogic = (props:TopData) => {
    let duration:string = props.list[0];
    let episodes:string = props.list[1];
    let seasons:string = props.list[2];
    let date:string = props.list[3];
    return { duration, episodes, seasons, date}
}

export default MultimediaBottomDataLogic

