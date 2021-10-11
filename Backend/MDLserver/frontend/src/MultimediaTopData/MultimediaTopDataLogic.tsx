import React, { useState } from 'react'

interface TopData {
    list: string[];
}


const MultimediaTopDataLogic = (props:TopData) => {
    let title:string = props.list[0];
    let type:string = props.list[1];
    let year:string = props.list[2];
    let genre:string = props.list[3];
    let color:string = props.list[4];
    return { title, type, year, genre, color}
}

export default MultimediaTopDataLogic

