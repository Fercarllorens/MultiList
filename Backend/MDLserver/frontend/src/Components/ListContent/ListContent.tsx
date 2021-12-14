import React, { useEffect } from 'react';
import './ListContent.css'
import ListContentLogic from './ListContentLogic';
import ContentPreview from '../Tops/ContentPreview/ContentPreview';

const ListContent = () => {
    const { list, currentContents, getData, filterData } = ListContentLogic()
    
    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="list-content">
            <h1 className="list-name">{list?.name}</h1>
            <input type="text" className="list-content-searchbar" placeholder="Search..." onChange={filterData} />
            <div className="list-content__container">
                {
                    currentContents?.map((element: any, index) => {
                        return (
                            <ContentPreview {...element}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ListContent