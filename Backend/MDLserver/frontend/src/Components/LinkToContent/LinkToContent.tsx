import React from 'react'
import LinkToContentLogic, {Props} from './LinkToContentLogic'
import './LinkToContent.css'

const LinkToContent: React.FC<Props> = (props) => {
    const {clicked, setClicked, textArea, handleClick} = LinkToContentLogic(props)

    return (
        <>
            <img src={props.icon} onClick={() => setClicked(!clicked)} alt={props.alt}/>
            {clicked &&
            <form> 
                <button onClick={handleClick}>Copy to clipboard</button>
                <textarea ref={textArea} value={window.location.href}/>
            </form>
            }
        </>
    )
}
export default LinkToContent