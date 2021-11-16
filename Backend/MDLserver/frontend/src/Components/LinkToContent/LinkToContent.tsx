import React from 'react'
import LinkToContentLogic, {Props} from './LinkToContentLogic'
import './LinkToContent.css'

const LinkToContent: React.FC<Props> = (props) => {
    const {clicked, setClicked, textArea, copyUrl, openWebsite} = LinkToContentLogic(props)

    return (
        <>
            <img className="contentlink-img" src={props.icon} onClick={() => setClicked(!clicked)} alt={props.alt? props.alt : ''}/>
            {clicked &&
            <form className="contentlink-form"> 
                <button onClick={copyUrl}>Copy to clipboard</button>
                <button onClick={openWebsite}>Go to Website</button>
                <textarea ref={textArea} value={window.location.href}/>
            </form>
            }
        </>
    )
}
export default LinkToContent