import React, { useEffect } from 'react';
import ContentPreviewLogic, { Props } from './ContentPreviewLogic'
import './ContentPreview.css'
import VisualContentPreview from '../VisualContentPreview/VisualContentPreview'
import AudioContentPreview from '../AudioContentPreview/AudioContentPreview'

const ContentPreview: React.FC<Props> = (props) => {
    const { item, getItem } = ContentPreviewLogic(props)

    useEffect(() => {
        getItem()
    }, [])

    return (
        <>
            {
                item && (
                    props.type === "film"
                        ? <VisualContentPreview content={item} type={props.type} />
                        : <AudioContentPreview content={item} />
                )
            }
        </>
    )

}
export default ContentPreview