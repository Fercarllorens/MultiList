import React from 'react';
import './ListContent.css'
import ListContentLogic from './ListContentLogic';
import SongPreview from '../SongPreview/SongPreview'
interface Props{
    id: string;
}

const ListContent: React.FC<Props> = (props) => {
    const {contents} = ListContentLogic(props)

    return (
        <div className="list-content">
            {/* <>
            {
                contents!==undefined ?
                    contents.map((element) => (
                        <SongPreview song={element} />
                    ))
                : 'No results'
            }
            </> */}
        </div>
    )
}

export default ListContent