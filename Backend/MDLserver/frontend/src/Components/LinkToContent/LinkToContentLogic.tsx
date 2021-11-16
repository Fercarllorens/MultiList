import React, {useRef, useState} from 'react'
export interface Props{
    icon: string;
    alt: string;
    website: string;
}

const LinkToContentLogic = (props: Props) => {
    const [clicked, setClicked] = useState(false)
    const textArea = useRef<HTMLTextAreaElement>(null)

    //TYPE THIS SHIT
    function copyUrl(e: any){
        if(textArea.current==null) return   
        textArea.current.select();
        document.execCommand('copy');
        e.target.focus();
    }

    function openWebsite(){
        window.open(props.website)
    }

    return {clicked, setClicked, textArea, copyUrl, openWebsite}
}
export default LinkToContentLogic